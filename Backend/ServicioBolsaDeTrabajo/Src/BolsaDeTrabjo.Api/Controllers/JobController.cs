using BolsaDeTrabajo.Model.DTOs;
using BolsaDeTrabajo.Model.Models;
using BolsaDeTrabajo.Service.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BolsaDeTrabjo.Api.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class JobController : Controller
    {
        private readonly IJobService _service;
        public JobController(IJobService service)
        {
            _service = service;
        }

        [HttpPost]
        [Route("/CargarEmpleo")]

        public async Task<IActionResult> AddJob([FromBody] AddJobDTO job)
        {
            try
            {
                await _service.AddJob(job);
                return CreatedAtAction(nameof(AddJob), null);

            }
            catch (Exception ex)
            {

                return BadRequest(new { error = ex.Message });

            }
        }
        [HttpDelete]
        [Route("/EliminarEmpleo/{id}")]

        public async Task<IActionResult> DeleteJob(int id)
        {
            try
            {
                bool response = await _service.DeleteJob(id);

                if(response)
                {
                    return Ok();

                }
                else
                {
                    return BadRequest(response);
                }

            }
            catch (Exception ex)
            {

                return BadRequest(new { error = ex.Message });

            }
        }


        [HttpGet]
        [Route("/ListaEmpleos")]

        public async Task<IActionResult> GetAllJobs()
        {
            try
            {
                List<viewJobDTO> getAllJobs = await _service.GetAllJobs();
                return Ok(getAllJobs);

            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });

            }
        }


        [HttpPost]
        [Route("/ModificarEmpleo")]

        public async Task<IActionResult> modifycompany([FromBody] viewJobDTO job)
        {
            try
            {
                await _service.ModifyJob(job);
                return Ok(job);

            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });

            }
        }


        [HttpPost]
        [Route("AplicarEmpleo")]

        public async Task<IActionResult> AplyJob([FromBody] AplyJobDTO aplyJob)
        {
            try
            {
                await _service.AplyJob(aplyJob);
                return Ok();

            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });

            }
        }

        [HttpGet]
        [Route("MisPostulaciones/{id}")]
        //[Authorize]
        public async Task<IActionResult> GetAllAplicatedJobs(int id)
        {
            try
            {
                List<MyAplicatedJobsDTO> getAllJobs = await _service.GetAllJobsAplicated(id);
                return Ok(getAllJobs);

            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });

            }
        }
    }
}
