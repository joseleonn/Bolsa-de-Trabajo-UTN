using BolsaDeTrabajo.Data.Interfaces;
using BolsaDeTrabajo.Model;
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



        public async Task<Admins?> InsertAdmin(Admins admin)
        {
            //ACCEDEMOS A LA ENTIDAD CON EntityEntry
            EntityEntry<Admins> insertedUser = await _context.Admins.AddAsync(admin);
            await _context.SaveChangesAsync();
            return insertedUser.Entity;
        }
    }
}
