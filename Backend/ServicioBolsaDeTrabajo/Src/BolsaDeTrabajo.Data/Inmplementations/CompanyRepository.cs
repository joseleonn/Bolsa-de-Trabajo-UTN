using BolsaDeTrabajo.Data.Interfaces;
using BolsaDeTrabajo.Model;
using BolsaDeTrabajo.Model.DTOs;
using BolsaDeTrabajo.Model.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
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

        //public async Task<bool> AddCompany(NewCompanyDTO newCompany)
        //{
        //    Usuarios ifUserExist = await _context.Usuarios.FirstOrDefaultAsync(u => u.Email == newCompany.Email);
        //    Empresas ifCompanyExist = await _context.Empresas.FirstOrDefaultAsync(a => a.Email == newCompany.Email);
        //
        //    if (ifExists == null)
        //    {
        //        Empresas newEmpresa = new Empresas()
        //        {
        //            IdUsuario = company.IdUsuario,
        //            Nombre = company.Nombre,
        //            Pais = company.Pais,
        //            Ciudad = company.Ciudad,
        //            Direccion = company.Direccion
        //        };
        //
        //        await _context.Empresas.AddAsync(newEmpresa);
        //        await _context.SaveChangesAsync();
        //
        //        return true;
        //    }
        //    else
        //    {
        //        return false;
        //    }
        //
        //}

        public async Task AddCompany(NewCompanyDTO newCompany)
        {
            try
            {
                Usuarios ifUserExist = await _context.Usuarios.FirstOrDefaultAsync(u => u.Email == newCompany.Email);
                Empresas ifCompanyExist = await _context.Empresas.FirstOrDefaultAsync(a => a.Email == newCompany.Email);

                if (ifCompanyExist != null)
                {
                    throw new Exception("La empresa ya existe");
                };

                if (ifUserExist != null)
                {
                    throw new Exception("El usuario ya existe");
                }


                using (IDbContextTransaction transaction = _context.Database.BeginTransaction())
                {
                    try
                    {
                        Usuarios newUser = new Usuarios()
                        {
                            Email = newCompany.Email,
                            Contrasenia = newCompany.Contrasenia,
                            TipoUsuario = 1, /*Tipo alumno */

                        };

                        await _context.Usuarios.AddAsync(newUser);
                        await _context.SaveChangesAsync();

                        Empresas empresa = new Empresas()
                        {
                            IdUsuario = newUser.IdUsuario,
                            Nombre = newCompany.Nombre,
                            Pais = newCompany.Pais,
                            Ciudad = newCompany.Ciudad,
                            Direccion = newCompany.Direccion,
                            Email = newCompany.Email
                        };
                        await _context.Empresas.AddAsync(empresa);
                        await _context.SaveChangesAsync();

                        transaction.Commit();
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine(ex.Message);
                        transaction.Rollback();
                        throw new Exception("Ocurrió un error al agregar la empresa", ex);
                    }
                }

            }
            catch (Exception ex)
            {
                throw new Exception("Error al agregar a la base de datos");
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
