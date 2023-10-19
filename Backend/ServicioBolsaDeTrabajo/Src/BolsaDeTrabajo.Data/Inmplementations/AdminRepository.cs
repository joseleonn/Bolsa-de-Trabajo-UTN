using BolsaDeTrabajo.Data.Interfaces;
using BolsaDeTrabajo.Model;
using BolsaDeTrabajo.Model.DTOs;
using BolsaDeTrabajo.Model.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BolsaDeTrabajo.Data.Inmplementations
{
    public class AdminRepository : IAdminRepository
    {
        private readonly BolsaDeTrabajoUTNContext _context;

        public AdminRepository(BolsaDeTrabajoUTNContext context)
        {
            _context = context;
        }

        public async Task<Admins?> GetAdminById(int id)
        {
            Admins user = await _context.Admins.FindAsync(id);
            return user;
        }

        public async Task<List<AdminDTO>> GetAllAdmins()
        {
            // Obtener todos los usuarios
            List<Admins> users = await _context.Admins.ToListAsync();

            // Mapea la lista de usuarios a una lista de objetos UsuariopDTO.
            List<AdminDTO> results = users.Select(usuario => new AdminDTO
            {
                IdAdmin = usuario.IdAdmin,
                IdUsuario = usuario.IdUsuario,
                RolAdmin = usuario.RolAdmin
            }).ToList();

            return results;

        }

        public async Task<bool> InsertAdmin(AdminDTO admin)
        {
            Admins ifexist = await _context.Admins.FirstOrDefaultAsync(e => e.IdUsuario == admin.IdUsuario);
            if (ifexist == null)
            {
                Admins newAdmin = new Admins()
                {
                    IdUsuario = admin.IdUsuario,
                    RolAdmin = 1
                };

                await _context.Admins.AddAsync(newAdmin);
                await _context.SaveChangesAsync();
                return true;
            }
            else
            {
                return false;
            }
        }

        public async Task DeleteAdmin(int id)
        {
            // Eliminar un usuario por su ID de la base de datos
            var admin = await _context.Admins.FindAsync(id);
            if (admin != null)
            {
                _context.Admins.Remove(admin);
                await _context.SaveChangesAsync();
            }
        }
    }
}
