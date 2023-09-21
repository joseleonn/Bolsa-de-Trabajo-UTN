using BolsaDeTrabajo.Data.Interfaces;
using BolsaDeTrabajo.Model.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BolsaDeTrabajo.Data.Implementations
{
    public class UsuarioRepository : IUsuarioRepository
    {
        private readonly BolsaDeTrabajoUTNContext _context;

        public UsuarioRepository(BolsaDeTrabajoUTNContext context)
        {
            _context = context;
        }

        public async Task<Usuarios?> GetUsuarioById(int id)
        {
            // Buscar un usuario por su ID
            return await _context.Usuarios.FindAsync(id);
        }

        public async Task<IEnumerable<Usuarios>> GetAllUsuarios()
        {
            // Obtener todos los usuarios
            return await _context.Usuarios.ToListAsync();
        }

        public async Task<Usuarios?> InsertUsuario(Usuarios usuario)
        {
            // Insertar un nuevo usuario en la base de datos
            EntityEntry<Usuarios> insertedUser = await _context.Usuarios.AddAsync(usuario);
            await _context.SaveChangesAsync();
            return insertedUser.Entity;
        }

        public async Task UpdateUsuario(Usuarios usuario)
        {
            // Actualizar un usuario existente en la base de datos
            _context.Entry(usuario).State = EntityState.Modified;
            await _context.SaveChangesAsync();
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
    }
}