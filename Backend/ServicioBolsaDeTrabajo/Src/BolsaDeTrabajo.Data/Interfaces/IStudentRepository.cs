using BolsaDeTrabajo.Model.DTOs;
using BolsaDeTrabajo.Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BolsaDeTrabajo.Data.Interfaces
{
    public interface IStudentRepository
    {
        Task AddUserAndStudent(StudentDTO newStudent);
        Task<List<StudentDTO>> GetAllStudents();

    }
}
