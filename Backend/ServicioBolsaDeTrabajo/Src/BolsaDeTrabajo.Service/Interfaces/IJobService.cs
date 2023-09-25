using BolsaDeTrabajo.Model.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BolsaDeTrabajo.Service.Interfaces
{
    public interface IJobService
    {
        Task<bool> AddJob(AddJobDTO job);
        Task<bool> DeleteJob(int jobId);
    }
}
