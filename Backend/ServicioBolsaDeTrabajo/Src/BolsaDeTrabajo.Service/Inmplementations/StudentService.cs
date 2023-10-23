using BolsaDeTrabajo.Data.Interfaces;
using BolsaDeTrabajo.Model.DTOs;
using BolsaDeTrabajo.Service.Interfaces;
using BolsaDeTrabjo.Api.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BolsaDeTrabajo.Service.Inmplementations
{
    public class StudentService : IStudentService
    {
        private readonly IStudentRepository _repository;
        private readonly IEncryptHelper _encrypt;

        public StudentService(IStudentRepository repository,  IEncryptHelper encrypt)
        {
            _repository = repository;
            _encrypt = encrypt;
        }
        public async Task AddStudent(StudentDTO student)
        {
            try
            {
                string hashedPassword = _encrypt.GetSHA256(student.Contrasenia);

                student.Contrasenia = hashedPassword;


                await _repository.AddUserAndStudent(student);

            }catch(Exception ex)
            {
                throw new Exception("Error en el service" + ex);
            }
        }

        public async Task<List<StudentDTO>> GetAllStudents()
        {
            try
            {
                List<StudentDTO> response = await _repository.GetAllStudents();
                return response;
            }catch(Exception ex)
            {
                throw new Exception("error en el service" + ex);
            }
        }
    }
}
