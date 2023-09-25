using BolsaDeTrabajo.Model.DTOs;
using BolsaDeTrabajo.Service.Interfaces;
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
    }
}
