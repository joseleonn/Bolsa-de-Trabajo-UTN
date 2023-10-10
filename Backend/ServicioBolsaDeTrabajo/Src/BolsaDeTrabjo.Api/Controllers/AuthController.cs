using BolsaDeTrabajo.Data.Implementations;
using BolsaDeTrabajo.Data.Interfaces;
using BolsaDeTrabajo.Model.DTOs;
using BolsaDeTrabajo.Model.Models;
using BolsaDeTrabajo.Service.Helpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace BolsaDeTrabajo.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
         
        private readonly IUsuarioRepository _usuarioRepository;
        private readonly string secretKey;

        public AuthController(IUsuarioRepository usuarioRepository, IConfiguration config)
        {
            _usuarioRepository = usuarioRepository;
            secretKey = config.GetSection("AppSettings:Key").ToString();
        }

        [HttpPost("Login")]
        public async Task<ActionResult<string>> Login([FromBody] AuthDTO user)
        {
            try
            {
                // Buscar el usuario en la base de datos por correo electrónico
                UsuariosDTO usuario = await _usuarioRepository.GetUsuarioByEmail(user.Email);

                if (usuario == null)
                {
                    return BadRequest("Usuario no encontrado");
                }

                // Verificar si la contraseña coincide
                if (usuario.Contrasenia != EncryptHelper.GetSHA256(user.Contrasenia))
                {
                    return BadRequest("Contraseña incorrecta");
                }

                Usuarios newToken = new Usuarios()
                {
                    IdUsuario = usuario.IdUsuario,
                    Email = usuario.Email,
                    TipoUsuario = usuario.TipoUsuario
                };
                // Generar un token JWT
                string token = GenerateJwtToken(newToken);

                return Ok(token);
            }
            catch (Exception ex)
            {
                return BadRequest( $"Error {ex.Message}");
            }
        }

        [HttpPost("Registro")]
        public async Task<ActionResult<string>> Registro([FromBody] UsuariosDTO newUser)
        {
            try
            {
                // Verificar si el usuario ya existe en la base de datos
                var existingUser = await _usuarioRepository.GetUsuarioByEmail(newUser.Email);
                if (existingUser != null)
                {
                    return BadRequest("El usuario ya existe");
                }

                // Crear un nuevo usuario
                Usuarios usuario = new Usuarios()
                {
                    // Asigna las propiedades del usuario a partir de newUser
                    // Esto depende de la estructura de UsuarioDTO y Usuarios
                    // Ejemplo:
                    Email = newUser.Email,
                    Contrasenia = EncryptHelper.GetSHA256(newUser.Contrasenia),
                    TipoUsuario = newUser.TipoUsuario
                };

                // Insertar el nuevo usuario en la base de datos
                await _usuarioRepository.InsertUsuario(newUser);

                // Generar un token JWT para el nuevo usuario
                var token = GenerateJwtToken(usuario);

                return Ok(token);
            }
            catch (Exception ex)
            {
                return BadRequest( $"Error interno del servidor: {ex.Message}");
            }
        }

        private string GenerateJwtToken(Usuarios usuario)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(secretKey);
            var tokenDescriptor = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.NameIdentifier, usuario.IdUsuario.ToString()),
                    new Claim(ClaimTypes.Email, usuario.Email),
                    new Claim("Tipo_Usuario", usuario.TipoUsuario.ToString())
                }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
