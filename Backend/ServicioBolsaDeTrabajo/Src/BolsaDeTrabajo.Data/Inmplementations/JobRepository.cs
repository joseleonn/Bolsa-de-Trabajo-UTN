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

namespace BolsaDeTrabajo.Data.Inmplementations
{
    public class JobRepository : IJobRepository
    {
        private readonly BolsaDeTrabajoUTNContext _context;
        public JobRepository(BolsaDeTrabajoUTNContext context)
        {
            _context = context;
        }
        public async Task<bool> AddJob(AddJobDTO job)
        {
           
                try
                {
                    Empresas ifCompanyExist = await _context.Empresas.FirstOrDefaultAsync(e => e.IdEmpresa == job.IdEmpresa);

                    if (ifCompanyExist != null)
                    {
                        PuestosDeTrabajo newJob = new PuestosDeTrabajo
                        {
                            IdEmpresa = ifCompanyExist.IdEmpresa,
                            Titulo = job.Titulo,
                            Disponible = job.Disponible,
                            Descripcion = job.Descripcion,
                        };
                        _context.PuestosDeTrabajo.Add(newJob);
                        await _context.SaveChangesAsync();




                        await _context.SaveChangesAsync();

                        return true;
                    }
                    return false;
                }
                catch (Exception ex)
                {
                    // En caso de error, deshacer la transacción

                    // Registrar o reenviar la excepción
                    Console.WriteLine(ex.Message);

                    return false; // Falló la operación
                }
            
        }

        public async Task<bool> DeleteJob(int jobId)
        {
            var jobToDelete = await _context.PuestosDeTrabajo.FindAsync(jobId);

            if (jobToDelete == null)
            {
                throw new Exception("No se encontro el puesto de trabajo");

            }
          
                try
                {
                

                    _context.PuestosDeTrabajo.Remove(jobToDelete);

 

                    await _context.SaveChangesAsync();

                    return true;
                }
                catch (Exception)
                {
                    // En caso de error, deshacer la transacción
                    throw new Exception("No se pudo cargar los datos en la base de datos. Desde el repository");
                }
            
        }

        public async Task<viewJobDTO> GetJobById(int id)
        {
            PuestosDeTrabajo ifExists = await _context.PuestosDeTrabajo.FirstOrDefaultAsync(e => e.IdPuesto == id);

            if (ifExists != null)
            {
                PuestosDeTrabajo jobById = await _context.PuestosDeTrabajo.FindAsync(id);

                viewJobDTO result = new viewJobDTO()
                {
                    IdPuesto = ifExists.IdPuesto,
                    Descripcion = ifExists.Descripcion,
                    Titulo = ifExists.Titulo,
                    Disponible = ifExists.Disponible,
                };
                return result;
            }
            else
            {
                return null;
            }
        }


        public async Task<List<viewJobDTO>> GetAllJobs()
        {
            List<PuestosDeTrabajo> jobs = await _context.PuestosDeTrabajo.ToListAsync();

            // Mapea la lista de empresas a una lista de objetos CompanyDTO.
            List<viewJobDTO> results = jobs.Select(job => new viewJobDTO
            {
                IdPuesto = job.IdPuesto,
                IdEmpresa = job.IdEmpresa,
                Descripcion = job.Descripcion,
                Titulo = job.Titulo,
                Disponible = job.Disponible,
            }).ToList();

            return results;

        }


        public async Task<bool> ModifyJob(viewJobDTO job)
        {
            PuestosDeTrabajo ifExists = await _context.PuestosDeTrabajo.FirstOrDefaultAsync(e => e.IdPuesto == job.IdPuesto);

            if (ifExists != null)
            {
                ifExists.Descripcion = job.Descripcion;
                ifExists.Titulo = job.Titulo;
                ifExists.Disponible = job.Disponible;

                _context.Entry(ifExists).State = EntityState.Modified;
                await _context.SaveChangesAsync();

                return true;
            }
            else
            {
                return false;
            }

        }

        public async Task AplyJob(AplyJobDTO aplyJob)
        {
            try
            {
                PuestosDeTrabajo ifJobExist = await _context.PuestosDeTrabajo.FirstOrDefaultAsync(j => j.IdPuesto == aplyJob.idJob);
                Usuarios ifUserExist = await _context.Usuarios
                    .Include(u => u.Alumnos)
                    .FirstOrDefaultAsync(u => u.Email == aplyJob.userEmail);

                if (ifJobExist == null)
                {
                    throw new Exception("El trabajo no existe");
                }
                if (ifUserExist == null)
                {
                    throw new Exception("El alumno no existe");
                }

                using (IDbContextTransaction transaction = _context.Database.BeginTransaction())
                {
                    try
                    {
                        Alumnos student = ifUserExist.Alumnos.FirstOrDefault(); 

                        if (student != null)
                        {
                            PuestosDeTrabajoPostulaciones ifAplyExist = await _context.PuestosDeTrabajoPostulaciones.FirstOrDefaultAsync(p => p.IdUsuario == ifUserExist.IdUsuario && p.IdPuestoDeTrabajo == aplyJob.idJob);
                            if (ifAplyExist != null)
                            {
                                throw new Exception("Ya estas postulado");
                            }
                            Postulaciones newAply = new Postulaciones()
                            {
                                DniAlumno = student.Dni,
                                Estado = 1, //cambiar en otro momento

                            };


                            await _context.Postulaciones.AddAsync(newAply);
                            await _context.SaveChangesAsync();

                            PuestosDeTrabajoPostulaciones newJobAply = new PuestosDeTrabajoPostulaciones()
                            {
                                IdPuestoDeTrabajo = aplyJob.idJob,
                                IdPostulacion = newAply.IdPostulacion,
                                IdUsuario = ifUserExist.IdUsuario,
                            };

                            await _context.PuestosDeTrabajoPostulaciones.AddAsync(newJobAply);
                            await _context.SaveChangesAsync();
                            transaction.Commit();
                        }

                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine(ex.Message);
                        transaction.Rollback();
                        throw new Exception("Ocurrió un error al agregar la postulación", ex);
                    }
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error al cargar en la base de datos", ex);
            }
        }

        public async Task<List<MyAplicatedJobsDTO>> GetAllJobsAplicated(int idUser)
        {
            Alumnos ifAlumnExist = await _context.Alumnos.FirstOrDefaultAsync(a => a.IdUsuario == idUser);

            if (ifAlumnExist == null)
            {
                throw new Exception("El usuario no es alumno");
            }

            List<MyAplicatedJobsDTO> jobsAplicated = await _context.PuestosDeTrabajoPostulaciones
                .Where(p => p.IdUsuario == idUser)
                .Join(_context.PuestosDeTrabajo, p => p.IdPuestoDeTrabajo, j => j.IdPuesto, (p, j) => new { p, j })
                .Join(_context.Postulaciones, pj => pj.p.IdPostulacion, po => po.IdPostulacion, (pj, po) => new { pj.p, pj.j, po })
                .Join(_context.Empresas, pjp => pjp.j.IdEmpresa, e => e.IdEmpresa, (pjp, e) => new MyAplicatedJobsDTO
                {
                    IdPostulacion = pjp.p.IdPostulacion,
                    IdPuesto = pjp.p.IdPuestoDeTrabajo,
                    DniAlumno = ifAlumnExist.Dni,
                    Estado = pjp.po.Estado,
                    Titulo = pjp.j.Titulo,
                    Descripcion = pjp.j.Descripcion,
                    IdEmpresa = pjp.j.IdEmpresa,
                    RazonSocial = e.Nombre,
                })
                .ToListAsync();

            return jobsAplicated;
        }

    }
}
