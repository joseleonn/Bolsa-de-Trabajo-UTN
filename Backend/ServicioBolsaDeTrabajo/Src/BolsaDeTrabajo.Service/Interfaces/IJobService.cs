using BolsaDeTrabajo.Model.DTOs;
using BolsaDeTrabajo.Model.Models;
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

        Task<List<viewJobDTO>> GetAllJobs();

        Task ModifyJob(viewJobDTO job);

        Task AplyJob(AplyJobDTO aply);
        Task<List<MyAplicatedJobsDTO>> GetAllJobsAplicated(int idUser);
    }
}
