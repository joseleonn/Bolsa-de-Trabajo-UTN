﻿using BolsaDeTrabajo.Data.Interfaces;
using BolsaDeTrabajo.Model;
using BolsaDeTrabajo.Model.DTOs;
using BolsaDeTrabajo.Model.Models;
using BolsaDeTrabajo.Service.Helpers;
using BolsaDeTrabajo.Service.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace BolsaDeTrabajo.Service.Implementations
{
    public class UsuarioService : IUsuarioService
    {
        private readonly IUsuarioRepository _repository;
        private readonly BolsaDeTrabajoUTNContext _context;
        private readonly IEmailService _email;
        public UsuarioService(IUsuarioRepository repository, BolsaDeTrabajoUTNContext context, IEmailService email)
        {
            _repository = repository;
            _context = context;
            _email = email;
        }

        public async Task InsertUsuarioAsync(UsuariosDTO usuario)
        {
            if (usuario != null)
            {
                UsuariosDTO newUser = new UsuariosDTO()
                {
                    Email = usuario.Email,
                    Contrasenia = EncryptHelper.GetSHA256(usuario.Contrasenia),
                    TipoUsuario = usuario.TipoUsuario

                };

                await _repository.InsertUsuario(newUser);
            }
            else
            {
                throw new Exception("El usuario es null");
            }
        }
        public async Task<UsuariosDTO> GetUsuarioByIdAsync(int id)
        {
            if (id != null)
            {

               UsuariosDTO getUser = await _repository.GetUsuarioById(id);
               if (getUser != null)
                {

                    return getUser;

                }
                else
                {

                    throw new Exception("El usuario no existe");
                }

            }
            else
            {
                throw new Exception("La id es null");
            }
        }

        public async Task<List<UsuariosDTO>> GetAllUsuariosAsync()
        {
            List<UsuariosDTO> listOfUsuarios = await _repository.GetAllUsuarios();

            if (listOfUsuarios != null)
            {
                return listOfUsuarios;
            }
            else
            {
                throw new Exception("Error al traer todos los usuarios");
            }
        }

        

        public async Task UpdateUsuarioAsync(UsuariosDTO usuario)
        {
            if (usuario != null)
            {
                bool result = await _repository.UpdateUsuario(usuario);
                if (!result)
                {
                    throw new Exception("El usuario no fue modificado");
                };
            }
            else
            {
                throw new Exception("La Empresa es null");
            }
        }

        public async Task DeleteUsuarioAsync(int id)
        {
            // Llama al método del repositorio para eliminar un usuario por su ID
            await _repository.DeleteUsuario(id);
        }

        public async Task<UsuariosDTO> GetUsuarioByEmailAsync(string email)
        {
            if (email != null)
            {

                UsuariosDTO getUser = await _repository.GetUsuarioByEmail(email);
                if (getUser != null)
                {

                    return getUser;

                }
                else
                {

                    throw new Exception("El usuario no existe");
                }

            }
            else
            {
                throw new Exception("La id es null");
            }
        }

        public async Task ChangePassword(UsuariosDTO user)
        {
            try
            {
                string token = GenerateToken.GenerateNumericToken();

                Tokens newToken = new Tokens()
                {
                    Token = token,
                    IdUsuario = user.IdUsuario,
                    FechaGeneracion = DateTime.Now.ToString(),
                    FechaExpiracion = DateTime.Now.AddDays(1).ToString(),
                    Valido = true
                };
                await _context.Tokens.AddAsync(newToken);
                await _context.SaveChangesAsync();

                EmailDTO newEmail = new EmailDTO()
                {
                    Destinatario = user.Email,
                    Asunto = "Cambiar Contraseña UTN",
                    Contenido = newToken.Token

                };
                bool send = await _email.SendEmail(newEmail);

                if (!send)
                {
                    throw new Exception("El mail no se envio");
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error al enviar el token");
            }


        }

        public async Task VerifyToken(string token)
        {
            try
            {
                Tokens ifTokenExist = await _context.Tokens.FirstOrDefaultAsync(t => t.Token == token);

                if (ifTokenExist == null)
                {
                    throw new Exception("El token no existe");
                }

            }
            catch (Exception ex)
            {
                throw new Exception("No se pudo verificar el token");
            }
        }
    }
}