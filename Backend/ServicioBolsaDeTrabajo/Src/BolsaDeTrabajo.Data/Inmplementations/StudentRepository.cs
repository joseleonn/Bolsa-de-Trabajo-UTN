using BolsaDeTrabajo.Data.Interfaces;
using BolsaDeTrabajo.Model.Models;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BolsaDeTrabajo.Model;
using BolsaDeTrabajo.Model.DTOs;

namespace BolsaDeTrabajo.Data.Inmplementations
{
    public class StudentRepository : IStudentRepository
    {
        private readonly BolsaDeTrabajoUTNContext _context;
        public StudentRepository(BolsaDeTrabajoUTNContext context)
        {
            _context = context;
        }
        public async Task AddUserAndStudent(StudentDTO newStudent)
        {
            try
            {
                Usuarios ifUserExist = await _context.Usuarios.FirstOrDefaultAsync(u => u.Email == newStudent.Email);
                Alumnos ifStudentExist = await _context.Alumnos.FirstOrDefaultAsync(a => a.Dni == newStudent.Dni);
                if (ifStudentExist != null)
                {
                    throw new Exception("El estudiante ya existe");
                };

                if (ifUserExist != null)
                {
                    throw new Exception("el usuario ya existe");
                }


                using (IDbContextTransaction transaction = _context.Database.BeginTransaction())
                {
                    try
                    {
                        Usuarios newUser = new Usuarios()
                        {
                            Email = newStudent.Email,
                            Contrasenia = newStudent.Contrasenia,
                            TipoUsuario = 1, /*Tipo alumno */

                        };

                        await _context.Usuarios.AddAsync(newUser);
                        await _context.SaveChangesAsync();

                        Alumnos student = new Alumnos()
                        {
                            IdUsuario = newUser.IdUsuario,
                            Dni = newStudent.Dni,
                            Apellido = newStudent.Apellido,
                            Nombre = newStudent.Nombre,
                            Email = newStudent.Email,
                            Celular = newStudent.Celular,
                            Nacionalidad = newStudent.Nacionalidad,
                            Pais = newStudent.Pais,
                            Ciudad = newStudent.Ciudad,
                            Direccion = newStudent.Direccion
                        };
                        await _context.Alumnos.AddAsync(student);
                        await _context.SaveChangesAsync();

                        transaction.Commit();
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
                throw new Exception("Error al agregar a la base de datos");
            }
        }

        public async Task<List<StudentDTO>> GetAllStudents()
        {


            try
            {
                List<StudentDTO> results = await (
                   from usuario in _context.Usuarios
                   join alumno in _context.Alumnos on usuario.IdUsuario equals alumno.IdUsuario
                   select new StudentDTO
                   {

                       Email = usuario.Email,
                       TipoUsuario = usuario.TipoUsuario,
                       Dni = alumno.Dni,
                       Nombre = alumno.Nombre,
                       Apellido = alumno.Apellido,
                       Celular = alumno.Celular,
                       Nacionalidad = alumno.Nacionalidad,
                       Pais = alumno.Pais,
                       Direccion = alumno.Direccion,
                       Ciudad = alumno.Ciudad,

                   }
               ).ToListAsync();

                return results;
            }
            catch (Exception ex)
            {
                throw new Exception("No se pudo cargar los datos en bd" + ex);
            }
        }


    }

}