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
        Task AddStudent(StudentDTO student);

        Task<List<StudentDTO>> GetAllStudents();
    }
}
