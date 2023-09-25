using BolsaDeTrabajo.Data.Inmplementations;
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


        public async Task<List<viewJobDTO>> GetAllJobs()
        {
            List<viewJobDTO> listOfJobs = await _repository.GetAllJobs();

            if (listOfJobs != null)
            {
                return listOfJobs;

            }
            else
            {
                throw new Exception("Error al traer todas las empresas");
            }
        }

        public async Task ModifyJob(viewJobDTO job)
        {
            if (job != null)
            {
                bool result = await _repository.ModifyJob(job);
                if (!result)
                {
                    throw new Exception("La Empresa no fue modificada");
                };
            }
            else
            {
                throw new Exception("La Empresa es null");
            }

        }

    }
}
