using BolsaDeTrabajo.Data.Interfaces;
using BolsaDeTrabajo.Model.DTOs;
using BolsaDeTrabajo.Model.Models;
using BolsaDeTrabajo.Service.Helpers;
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

        private readonly RabbitMQHelper _rabbitMQHelper;

        public AdminService(IAdminRepository adminRepository, RabbitMQHelper rabbitMQHelper)
        {
            _adminRepository = adminRepository;
            _rabbitMQHelper = rabbitMQHelper;
        }

        public async Task<AdminDTO> GetByIdAsync(int id)
        {
            Admins admin = await _adminRepository.GetAdminById(id);

            if(admin != null) {
                AdminDTO request = new AdminDTO
                {
                    IdAdmin = admin.IdAdmin,
                    IdUsuario = admin.IdUsuario,
                    RolAdmin = admin.RolAdmin,
                };
                return request;
            }
            else
            {
                return null;
            }

           
        }

        public void TestEmail(string destinatario, string asunto, string mensaje)
        {
            _rabbitMQHelper.SendRabbitMessage(destinatario, asunto,  mensaje);
        }
    }
}
