using BolsaDeTrabajo.Data.Inmplementations;
using BolsaDeTrabajo.Data.Interfaces;
using BolsaDeTrabajo.Model.DTOs;
using BolsaDeTrabajo.Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BolsaDeTrabajo.Service.Inmplementations
{
    public class JobService : IJobService
    {
        private readonly IJobRepository _repository;

        public JobService(IJobRepository repository)
        {
            _repository = repository;
        }
        public async Task<bool>AddJob(AddJobDTO job)
        {
            bool response = await _repository.AddJob(job);

            if (response)
            {
                return true;
            }
            else
            {
                return false;
            }

        }


        public async Task<bool> DeleteJob(int jobId)
        {
            return await _repository.DeleteJob(jobId);


        }
    }
}
