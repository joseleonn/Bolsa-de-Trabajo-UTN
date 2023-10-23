using BolsaDeTrabajo.Data.Interfaces;
using BolsaDeTrabajo.Model;
using BolsaDeTrabajo.Model.DTOs;
using BolsaDeTrabajo.Model.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BolsaDeTrabajo.Data.Inmplementations
{
    public class SuscriptorRepository: ISuscriptorRepository
    {
        private readonly BolsaDeTrabajoUTNContext _context;

        public SuscriptorRepository(BolsaDeTrabajoUTNContext context)
        {
            _context = context;
        }
        public async Task<List<SuscriptoresDTO>> GetAllSuscriptores()
        {
            // Obtener todos los usuarios
            List<Suscriptores> suscriptores = await _context.Suscriptores.ToListAsync();

            // Mapea la lista de usuarios a una lista de objetos UsuariopDTO.
            List<SuscriptoresDTO> results = suscriptores.Select(suscriptor => new SuscriptoresDTO
            {
                IdSuscriptor = suscriptor.IdSuscriptor,
                IdUsuario = suscriptor.IdUsuario
            }).ToList();

            return results;

        }

        public async Task<bool> CreateSuscriptor(SuscriptoresDTO suscriptor)
        {
            Suscriptores ifExists = await _context.Suscriptores.FirstOrDefaultAsync(e => e.IdUsuario == suscriptor.IdUsuario);

            if (ifExists == null)
            {
                Suscriptores newSuscriptor = new Suscriptores()
                {
                    IdUsuario = suscriptor.IdUsuario,

                };

                await _context.Suscriptores.AddAsync(newSuscriptor);
                await _context.SaveChangesAsync();

                return true;
            }
            else
            {
                return false;
            }
        }
    }
}
