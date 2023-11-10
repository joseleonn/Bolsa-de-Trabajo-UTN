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
using System.Net;

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
                            CuitCuil = newStudent.CuitCuil,
                            Carrera = newStudent.Carrera

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
                       Contrasenia = usuario.Contrasenia,
                       TipoUsuario = usuario.TipoUsuario,
                       CuitCuil = usuario.CuitCuil,
                       Carrera = usuario.Carrera,
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

        public async Task PostPDF(byte[] file, string studentDNI)
        {


            using (IDbContextTransaction transaction = _context.Database.BeginTransaction())
            {
                try 
                {

                    Alumnos student = await _context.Alumnos.FirstOrDefaultAsync(a => a.Dni == studentDNI);
                    if (student == null)
                    {
                        throw new Exception("El alumno no existe");
                    }


                    student.Curriculum = file;

                    await _context.SaveChangesAsync();
                    transaction.Commit();

                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                    transaction.Rollback();
                    throw new Exception("Ocurrió un error al agregar la el curriculum", ex);
                }
            
            }



        }

        public async Task<byte[]> GetPDF(string studentDni)
        {
            try
            {
                Alumnos student = await _context.Alumnos.FirstOrDefaultAsync(s => s.Dni == studentDni);

                if (student == null)
                {
                    throw new Exception("No se encontró ningún estudiante con el DNI " + studentDni);
                }

                return student.Curriculum;
            }
            catch(Exception ex)
            {
                throw new Exception("Error al traer el pdf");
            }
       
        }

        public async Task<StudentDTO> GetStudentById(int id)
        {
            try
            {
                Usuarios user = await _context.Usuarios.FirstOrDefaultAsync(u => u.IdUsuario == id);
                Alumnos student = await _context.Alumnos.FirstOrDefaultAsync(a=> a.IdUsuario == id);

                if (student !=null)
                {
                    StudentDTO response = new StudentDTO()
                    {
                    Email = user.Email,
                    Dni = student.Dni ,
                    Nombre= student.Nombre,
                    Apellido = student.Apellido,
                    Celular = student.Celular,
                    Nacionalidad = student.Nacionalidad,
                    Pais = student.Pais,
                    Ciudad = student.Ciudad,
                    Direccion = student.Direccion,
                    Curriculum = student.Curriculum,
                    
                    };

                    return response;
                }
                else
                {
                    throw new Exception("No existe el usuario" );

                }

            }
            catch (Exception ex)
            {
                throw new Exception("Error al traer todos los datos" + ex);
            }
        }

        public async Task ModifyUserAndStudent(StudentDTO student)
        {
            try
            {
                Usuarios ifUserExist = await _context.Usuarios.FirstOrDefaultAsync(u => u.Email == student.Email);
                Alumnos ifStudentExist = await _context.Alumnos.FirstOrDefaultAsync(a => a.Dni == student.Dni);

                if (ifStudentExist == null) {
                    throw new Exception("El dni no fue encontrado");
                }
                if(ifStudentExist == null)
                {
                    throw new Exception("El mail no fue encontrado");
                }
                ifUserExist.Email = student.Email;
                ifUserExist.Contrasenia = ifUserExist.Contrasenia;
                ifUserExist.TipoUsuario = ifUserExist.TipoUsuario;

                ifStudentExist.Curriculum = ifStudentExist.Curriculum;
                ifStudentExist.Nombre = student.Nombre;
                ifStudentExist.Apellido = student.Apellido;
                ifStudentExist.Celular = student.Celular;
                ifStudentExist.Nacionalidad = student.Nacionalidad;
                ifStudentExist.Pais = student.Pais;
                ifStudentExist.Ciudad = student.Ciudad;
                ifStudentExist.Direccion = student.Direccion;
                using (IDbContextTransaction transaction = _context.Database.BeginTransaction())
                {
                    try
                    {
               
                      
                        await _context.SaveChangesAsync();

                        transaction.Commit();
                    }
                    catch(Exception ex)
                    {
                        transaction.Rollback();
                        throw new Exception(ex.Message);
                    }
                }

            }
            catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }

}