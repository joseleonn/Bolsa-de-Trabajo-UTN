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
                            TipoUsuario = 2, /*Tipo empresa */
                            CuitCuil = newCompany.CuitCuil,
                            IdCarrera = newCompany.Carrera,
                            Estado = 1,
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
            Usuarios ifUserExists = await _context.Usuarios.FirstOrDefaultAsync(e => e.IdUsuario == id && e.Estado == 1);

            if(ifUserExists == null)
            {
                throw new Exception("El usuario no existe");
            }
            Empresas ifCompanyExist = await _context.Empresas.FirstOrDefaultAsync(e => e.IdUsuario == id);
            if (ifCompanyExist != null)
            {

                CompanyDTO result = new CompanyDTO()
                {
                    IdEmpresa = ifCompanyExist.IdEmpresa,
                    IdUsuario = ifCompanyExist.IdUsuario,
                    Nombre = ifCompanyExist.Nombre,
                    Ciudad = ifCompanyExist.Ciudad,
                    Pais = ifCompanyExist.Pais,
                    Direccion = ifCompanyExist.Direccion,
                    CuitCuil = ifUserExists.CuitCuil

                };
                return result;
            }
            else
            {
                throw new Exception("La empresa no existe");
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
        public async Task ModifyCompanyAndUser(CompanyDTO company)
        {
            try
            {
                Usuarios ifUserExist = await _context.Usuarios.FirstOrDefaultAsync(u => u.Email == company.Email && u.Estado == 1);
                Empresas ifCompanyExist = await _context.Empresas.FirstOrDefaultAsync(a => a.Email == company.Email);

                if (ifUserExist == null)
                {
                    throw new Exception("El Email de usuario no fue encontrado");
                }
                if (ifCompanyExist == null)
                {
                    throw new Exception("El Email de empresa no fue encontrado");
                }
                ifUserExist.Email = company.Email;
                ifUserExist.Contrasenia = ifUserExist.Contrasenia;
                ifUserExist.TipoUsuario = ifUserExist.TipoUsuario;

                ifCompanyExist.Nombre = company.Nombre;
                ifCompanyExist.Pais = company.Pais;
                ifCompanyExist.Ciudad = company.Ciudad;
                ifCompanyExist.Direccion = company.Direccion;
                ifCompanyExist.Email = company.Email;

                using (IDbContextTransaction transaction = _context.Database.BeginTransaction())
                {
                    try
                    {
                        await _context.SaveChangesAsync();

                        transaction.Commit();
                    }
                    catch (Exception ex)
                    {
                        transaction.Rollback();
                        throw new Exception(ex.Message);
                    }
                }

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task DeteleCompany(int id)
        {
            Usuarios User = await _context.Usuarios.FirstOrDefaultAsync(u => u.IdUsuario == id && u.Estado == 1);
            Empresas empresa = await _context.Empresas.FirstOrDefaultAsync(s => s.IdUsuario == id);

            if (empresa == null)
            {
                throw new Exception("La empresa o el usuario no existe");
            }
            using (IDbContextTransaction transaction = _context.Database.BeginTransaction())
            {
                User.Estado = 2;


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
