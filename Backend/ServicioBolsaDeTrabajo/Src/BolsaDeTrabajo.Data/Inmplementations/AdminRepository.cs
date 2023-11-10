using BolsaDeTrabajo.Data.Interfaces;
using BolsaDeTrabajo.Model;
using BolsaDeTrabajo.Model.DTOs;
using BolsaDeTrabajo.Model.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Storage;
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
                    RolAdmin = admin.RolAdmin
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
        public async Task DeleteAdminAndUser(int id)
        {
            Usuarios User = await _context.Usuarios.FirstOrDefaultAsync(u => u.IdUsuario == id);
            Admins admin = await _context.Admins.FirstOrDefaultAsync(s => s.IdUsuario == id);

            if (admin == null)
            {
                throw new Exception("El estudiante o el usuario no existe");
            }

            using (IDbContextTransaction transaction = _context.Database.BeginTransaction())
            {
                _context.Admins.Remove(admin);
                _context.Usuarios.Remove(User);


                try
                {
                    await _context.SaveChangesAsync();
                    transaction.Commit();

                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    throw new Exception("Error al borrar los datos" + ex);
                }
            }
        }
    }
}
