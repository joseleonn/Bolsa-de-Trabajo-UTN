using BolsaDeTrabajo.Model.DTOs;
using BolsaDeTrabajo.Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BolsaDeTrabajo.Service.Interfaces
{
    public interface IAdminService
    {
        Task InsertAdmin(AdminDTO admin);
        Task<AdminDTO> GetByIdAsync(int id);
        Task<List<AdminDTO>> GetAllAdmins();
        Task DeleteAdmin(int id);

        Task DeleteAdminAndUser(int id);
    }
}
