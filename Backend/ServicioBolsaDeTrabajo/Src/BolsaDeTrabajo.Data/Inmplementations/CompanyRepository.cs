using BolsaDeTrabajo.Data.Interfaces;
using BolsaDeTrabajo.Model.DTOs;
using BolsaDeTrabajo.Model.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace BolsaDeTrabajo.Data.Inmplementations
{
    public class CompanyRepository : ICompanyRepository
    {
        private readonly BolsaDeTrabajoUTNContext _context;

        public CompanyRepository(BolsaDeTrabajoUTNContext context)
        {
            _context = context;
        }

        public async Task<bool> AddCompany(CompanyDTO company)
        {
            Empresas ifExists = await _context.Empresas.FirstOrDefaultAsync(e => e.Nombre == company.Nombre);

            if(ifExists != null)
            {
                Empresas newEmpresa = new Empresas()
                {
                    IdUsuario = company.IdUsuario,
                    Nombre = company.Nombre,
                    Pais = company.Pais,
                    Ciudad = company.Ciudad,
                    Direccion = company.Direccion
                };

                await _context.Empresas.AddAsync(newEmpresa);

                return true;
            }
            else
            {
                return false;
            }

        }


        public async Task<CompanyDTO> GetCompanyById(int id)
        {
            Empresas ifExists = await _context.Empresas.FirstOrDefaultAsync(e => e.IdEmpresa == id);

            if (ifExists != null)
            {
                Empresas companyById = await _context.Empresas.FindAsync(id);

                CompanyDTO result = new CompanyDTO()
                {
                    IdEmpresa = companyById.IdEmpresa,
                    IdUsuario = companyById.IdUsuario,
                    Nombre = companyById.Nombre,
                    Ciudad = companyById.Ciudad,
                    Pais = companyById.Pais,
                    Direccion = companyById.Direccion

                };
                return result;
            }
            else
            {
                return null;
            }
        }


        public async Task<List<CompanyDTO>> GetAllCompanies()
        {
            List<Empresas> companies = await _context.Empresas.ToListAsync();

            // Mapea la lista de empresas a una lista de objetos CompanyDTO.
            List<CompanyDTO> results = companies.Select(company => new CompanyDTO
            {
                IdEmpresa = company.IdEmpresa,
                IdUsuario = company.IdUsuario,
                Nombre = company.Nombre,
                Ciudad = company.Ciudad,
                Pais = company.Pais,
                Direccion = company.Direccion
            }).ToList();

            return results;
      
        }



        public async Task<bool> ModifyCompany(CompanyDTO company)
        {
            Empresas existingCompany = await _context.Empresas.FirstOrDefaultAsync(e => e.IdEmpresa == company.IdEmpresa);

            if (existingCompany != null)
            {
                existingCompany.Nombre = company.Nombre;
                existingCompany.Pais = company.Pais;
                existingCompany.Ciudad = company.Ciudad;
                existingCompany.Direccion = company.Direccion;

                _context.Entry(existingCompany).State = EntityState.Modified;
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
