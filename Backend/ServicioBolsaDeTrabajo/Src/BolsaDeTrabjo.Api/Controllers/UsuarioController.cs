using BolsaDeTrabajo.Model.DTOs;
using BolsaDeTrabajo.Model.Models;
using BolsaDeTrabajo.Service.Implementations;
using BolsaDeTrabajo.Service.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace BolsaDeTrabajo.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private readonly IUsuarioService _usuarioService;

        public UsuarioController(IUsuarioService usuarioService)
        {
            _usuarioService = usuarioService;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UsuariosDTO>> GetById(int id)
        {
            var usuario = await _usuarioService.GetUsuarioByIdAsync(id);

            if (usuario == null)
            {
                return NotFound();
            }

            return Ok(usuario);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UsuariosDTO>>> GetAll()
        {
            var usuarios = await _usuarioService.GetAllUsuariosAsync();
            return Ok(usuarios);
        }


        [HttpPost("CambiarContrasenia")]
        public async Task<IActionResult> Put([FromBody] UsuariosDTO usuarioDTO)
        {
            try
            {
                await _usuarioService.UpdateUsuarioAsync(usuarioDTO);
                return Ok("contra modificada");
            }
            catch(Exception ex)
            {
                return BadRequest("error al modificar contra" + ex);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _usuarioService.DeleteUsuarioAsync(id);
            return NoContent();
        }

        [HttpPost]
        [Route("GenerarToken/{email}")]
        public async Task<ActionResult> ChangePassword(string email)
        {
            try
            {
                await _usuarioService.ChangePassword(email);
                return Ok();
            }
            catch
            {
                return BadRequest("Hubo un error al enviar el mail");
            }
        }

        [HttpPost]
        [Route("VerificarToken/{token}")]
        public async Task<ActionResult> VerifyToken(string token)
        {
            try
            {
                await _usuarioService.VerifyToken(token);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest("El token no coincide");
            }
        }
    }
}