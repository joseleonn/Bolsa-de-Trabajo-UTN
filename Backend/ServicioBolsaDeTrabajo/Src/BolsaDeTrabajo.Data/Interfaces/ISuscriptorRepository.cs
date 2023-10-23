using BolsaDeTrabajo.Model.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BolsaDeTrabajo.Data.Interfaces
{
    public interface ISuscriptorRepository
    {
        Task<List<SuscriptoresDTO>> GetAllSuscriptores();
        Task<bool> CreateSuscriptor(SuscriptoresDTO suscriptor);
    }
}
