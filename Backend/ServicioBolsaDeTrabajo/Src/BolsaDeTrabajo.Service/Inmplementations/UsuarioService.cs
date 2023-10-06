using BolsaDeTrabajo.Data.Interfaces;
using BolsaDeTrabajo.Model.DTOs;
using BolsaDeTrabajo.Model.Models;
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

        public UsuarioService(IUsuarioRepository repository)
        {
            _repository = repository;
        }

        public async Task InsertUsuarioAsync(UsuariosDTO usuario)
        {
            if (usuario != null)
            {
                await _repository.InsertUsuario(usuario);
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
    }
}