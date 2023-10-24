using BolsaDeTrabajo.Model.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BolsaDeTrabajo.Data.Interfaces
{
    public interface IJobRepository
    {

        Task<bool> AddJob(AddJobDTO job);

        Task<viewJobDTO>GetJobById(int id);

        Task<bool> DeleteJob(int jobId);

        Task<List<viewJobDTO>> GetAllJobs();
        Task<bool> ModifyJob(viewJobDTO job);
        Task AplyJob(AplyJobDTO aplyJob);



    }
}
