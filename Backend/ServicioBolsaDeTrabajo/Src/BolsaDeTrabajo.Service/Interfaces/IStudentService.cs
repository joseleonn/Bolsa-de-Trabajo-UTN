using BolsaDeTrabajo.Model.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BolsaDeTrabajo.Service.Interfaces
{
    public interface IStudentService
    {
        Task<StudentDTO> GetStudentById(int id);

        Task AddStudent(StudentDTO student);

        Task<List<StudentDTO>> GetAllStudents();

        Task PostPDF(Byte64DTO fileDto);

        Task<byte[]> GetPDF(int studentDni);
        Task ModifyUserAndStudent(StudentDTO student);
        Task DeleteStudent(int id);
    }
}
