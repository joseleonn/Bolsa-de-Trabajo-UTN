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
        Task<AdminDTO> GetByIdAsync(int id);

        void TestEmail(string destinatario, string asunto, string mensaje);
    }
}
