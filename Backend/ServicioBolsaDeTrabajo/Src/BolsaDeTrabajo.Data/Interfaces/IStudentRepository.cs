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
        Task PostPDF(Byte64DTO fileDto);

        Task<byte[]> GetPDF(int studentDni);

        Task ModifyUserAndStudent(StudentDTO student);
        Task<bool> DeleteUserAndStudent(int id);

    }
}