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
            try
            {
                Alumnos ifAlumnExist = await _context.Alumnos.FirstOrDefaultAsync(a => a.IdUsuario == idUser);

                if (ifAlumnExist != null)
                {
                    List<PuestosDeTrabajoPostulaciones> jobsAplicated = await _context.PuestosDeTrabajoPostulaciones
                        .Where(p => p.IdUsuario == idUser)
                        .ToListAsync();

                    List<MyAplicatedJobsDTO> jobsDTOList = new List<MyAplicatedJobsDTO>();

                    foreach (var jobAplicated in jobsAplicated)
                    {
                        PuestosDeTrabajo jobs = await _context.PuestosDeTrabajo
                            .FirstOrDefaultAsync(p => p.IdPuesto == jobAplicated.IdPuestoDeTrabajo);

                        Postulaciones tablaPostulaciones = await _context.Postulaciones
                            .FirstOrDefaultAsync(p => p.IdPostulacion == jobAplicated.IdPostulacion);
                        Empresas company = await _context.Empresas
                           .FirstOrDefaultAsync(p => p.IdEmpresa == jobs.IdEmpresa);

                        if (jobs != null && tablaPostulaciones != null)
                        {
                            MyAplicatedJobsDTO dto = new MyAplicatedJobsDTO
                            {
                                IdPostulacion = jobAplicated.IdPostulacion,
                                IdPuesto = jobAplicated.IdPuestoDeTrabajo,
                                DniAlumno = ifAlumnExist.Dni,
                                Estado = tablaPostulaciones.Estado,
                                Titulo = jobs.Titulo,
                                Descripcion = jobs.Descripcion,
                                IdEmpresa = jobs.IdEmpresa,
                                RazonSocial = company.Nombre,
                            };

                            jobsDTOList.Add(dto);
                        }
                    }

                    return jobsDTOList;
                }
                else
                {
                    throw new Exception("El usuario no es alumno");
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

    }
}
