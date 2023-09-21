using BolsaDeTrabajo.Model.DTOs;
using BolsaDeTrabajo.Model.Models;
using BolsaDeTrabajo.Service.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BolsaDeTrabajo.Service.Implementations
{
    public class UsuarioService : IUsuarioService
    {
        private readonly BolsaDeTrabajoUTNContext _context;

        public UsuarioService(BolsaDeTrabajoUTNContext context)
        {
            _context = context;
        }

        public async Task<UsuarioDTO> GetUsuarioByIdAsync(int id)
        {
            var usuario = await _context.Usuarios.FindAsync(id);

            if (usuario == null)
            {
                return null;
            }

            // Mapear el objeto de modelo a un DTO
            var usuarioDTO = new UsuarioDTO
            {
                IdUsuario = usuario.IdUsuario,
                Email = usuario.Email,
                Contrasenia = usuario.Contrasenia,
                TipoUsuario = usuario.TipoUsuario,
                // Mapear otros campos si es necesario
            };

            return usuarioDTO;
        }

        public async Task<IEnumerable<UsuarioDTO>> GetAllUsuariosAsync()
        {
            var usuarios = await _context.Usuarios.ToListAsync();

            // Mapear la lista de objetos de modelo a una lista de DTOs
            var usuariosDTO = usuarios.Select(usuario => new UsuarioDTO
            {
                IdUsuario = usuario.IdUsuario,
                Email = usuario.Email,
                Contrasenia = usuario.Contrasenia,
                TipoUsuario = usuario.TipoUsuario,
                // Mapear otros campos si es necesario
            });

            return usuariosDTO;
        }

        public async Task<UsuarioDTO> InsertUsuarioAsync(UsuarioDTO usuarioDTO)
        {
            // Mapear el DTO a un objeto de modelo
            var usuarioModel = new Usuarios
            {
                Email = usuarioDTO.Email,
                TipoUsuario = usuarioDTO.TipoUsuario,
                Contrasenia = usuarioDTO.Contrasenia // Guardar la contraseña en texto claro en la base de datos
                                                     // Mapear otros campos si es necesario
            };

            _context.Usuarios.Add(usuarioModel);
            await _context.SaveChangesAsync();

            // Mapear el objeto de modelo a un DTO y devolverlo
            usuarioDTO.IdUsuario = usuarioModel.IdUsuario;
            return usuarioDTO;
        }

        public async Task UpdateUsuarioAsync(UsuarioDTO usuarioDTO)
        {
            var usuarioModel = await _context.Usuarios.FindAsync(usuarioDTO.IdUsuario);

            if (usuarioModel == null)
            {
                // Maneja el caso en que el usuario no existe
                // Puedes lanzar una excepción, devolver un resultado específico, etc.
                return;
            }

            usuarioModel.Email = usuarioDTO.Email;
            usuarioModel.TipoUsuario = usuarioDTO.TipoUsuario;
            usuarioModel.Contrasenia = usuarioDTO.Contrasenia;

            _context.Entry(usuarioModel).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteUsuarioAsync(int id)
        {
            var usuarioModel = await _context.Usuarios.FindAsync(id);
            if (usuarioModel != null)
            {
                _context.Usuarios.Remove(usuarioModel);
                await _context.SaveChangesAsync();
            }
        }
    }
}