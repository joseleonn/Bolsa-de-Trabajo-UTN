using BolsaDeTrabajo.Data.Interfaces;
using BolsaDeTrabajo.Model;
using BolsaDeTrabajo.Model.DTOs;
using BolsaDeTrabajo.Model.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace BolsaDeTrabajo.Data.Implementations
{
    public class UsuarioRepository : IUsuarioRepository
    {
        private readonly BolsaDeTrabajoUTNContext _context;
        public UsuarioRepository(BolsaDeTrabajoUTNContext context)
        {
            _context = context;
        }

        public async Task<UsuariosDTO> GetUsuarioById(int id)
        {
            Usuarios ifExists = await _context.Usuarios.FirstOrDefaultAsync(e => e.IdUsuario == id);

            if (ifExists != null)
            {
                Usuarios usuarioById = await _context.Usuarios.FindAsync(id);

                UsuariosDTO result = new UsuariosDTO()
                {
                    IdUsuario = usuarioById.IdUsuario,
                    Email = usuarioById.Email,
                    Contrasenia = usuarioById.Contrasenia,
                    TipoUsuario = usuarioById.TipoUsuario

                };
                return result;
            }
            else
            {
                return null;
            }
        }

        public async Task<List<UsuariosDTO>> GetAllUsuarios()
        {
            // Obtener todos los usuarios
            List<Usuarios> users = await _context.Usuarios.ToListAsync();

            // Mapea la lista de usuarios a una lista de objetos UsuariopDTO.
            List<UsuariosDTO> results = users.Select(usuario => new UsuariosDTO
            {
                IdUsuario = usuario.IdUsuario,
                Email = usuario.Email,
                Contrasenia = usuario.Contrasenia,
                TipoUsuario = usuario.TipoUsuario
            }).ToList();

            return results;

        }

        public async Task<bool> InsertUsuario(UsuariosDTO usuario)
        {
            Usuarios ifExists = await _context.Usuarios.FirstOrDefaultAsync(e => e.Email == usuario.Email);

            if (ifExists == null)
            {
                Usuarios newUsuario = new Usuarios()
                {
                    IdUsuario = usuario.IdUsuario,
                    Email = usuario.Email,
                    Contrasenia = usuario.Contrasenia,
                    TipoUsuario = usuario.TipoUsuario

                };

                await _context.Usuarios.AddAsync(newUsuario);
                await _context.SaveChangesAsync();

                return true;
            }
            else
            {
                return false;
            }
        }

        public async Task<bool> UpdateUsuario(UsuariosDTO usuario)
        {
            // Buscar el usuario por su ID
            Usuarios existingUser = await _context.Usuarios.FirstOrDefaultAsync(e => e.Email == usuario.Email);

            if (existingUser != null)
            {
                existingUser.Email = usuario.Email;
                existingUser.Contrasenia = usuario.Contrasenia;
                existingUser.TipoUsuario = usuario.TipoUsuario;
                // Actualiza otros campos si es necesario

                // Marcar la entidad como modificada
                _context.Entry(existingUser).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                return true;
            }
            else
            {
                return false;
            }
        }

        public async Task DeleteUsuario(int id)
        {
            // Eliminar un usuario por su ID de la base de datos
            var usuario = await _context.Usuarios.FindAsync(id);
            if (usuario != null)
            {
                _context.Usuarios.Remove(usuario);
                await _context.SaveChangesAsync();
            }
        }
        public async Task<UsuariosDTO> GetUsuarioByEmail(string email)
        {
            Usuarios ifExists = await _context.Usuarios.FirstOrDefaultAsync(e => e.Email == email);

            if (ifExists != null)
            {

                UsuariosDTO result = new UsuariosDTO()
                {
                    IdUsuario = ifExists.IdUsuario,
                    Email = ifExists.Email,
                    Contrasenia = ifExists.Contrasenia,
                    TipoUsuario = ifExists.TipoUsuario

                };
                return result;
            }
            else
            {
                return null;
            }
        }

        

    }
}