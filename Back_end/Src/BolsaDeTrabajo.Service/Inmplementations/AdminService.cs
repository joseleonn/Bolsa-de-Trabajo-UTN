using BolsaDeTrabajo.Data.Interfaces;
using BolsaDeTrabajo.Model.DTOs;
using BolsaDeTrabajo.Model.Models;
using BolsaDeTrabajo.Service.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BolsaDeTrabajo.Service.Inmplementations
{
    public class AdminService : IAdminService
    {
        private readonly IAdminRepository _adminRepository;

        public AdminService(IAdminRepository adminRepository)
        {
            _adminRepository = adminRepository;
        }

        public async Task<AdminDTO> GetByIdAsync(int id)
        {
            Admins admin = await _adminRepository.GetAdminById(id);

            AdminDTO request = new AdminDTO
            {
                IdAdmin = admin.IdAdmin,
                IdUsuario = admin.IdUsuario,
                RolAdmin = admin.RolAdmin,
            };
            return request;
        }
    }
}
