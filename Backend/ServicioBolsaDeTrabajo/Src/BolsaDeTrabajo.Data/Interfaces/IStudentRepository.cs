using BolsaDeTrabajo.Model.DTOs;
using BolsaDeTrabajo.Model.Models;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BolsaDeTrabajo.Data.Interfaces
{
    public interface IStudentRepository
    {
        Task<StudentDTO>GetStudentById(int id);
        Task AddUserAndStudent(StudentDTO newStudent);
        Task<List<StudentDTO>> GetAllStudents();
        Task PostPDF(byte[] file, string studentDNI);

        Task<byte[]> GetPDF(string studentDni);

        Task ModifyUserAndStudent(StudentDTO student);
       
    }
}