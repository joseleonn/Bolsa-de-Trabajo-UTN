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


        //[HttpGet]
        //[Route("/BuscarEmpresa/{id}")]

        //public async Task<IActionResult> AddCompany(int id)
        //{
        //    try
        //    {
        //        CompanyDTO getCompany = await _service.GetCompanyById(id);
        //        return Ok(getCompany);

        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(new { error = ex.Message });

        //    }
        //}


        //[HttpGet]
        //[Route("/ListaEmpresas")]

        //public async Task<IActionResult> GetAllCompanies()
        //{
        //    try
        //    {
        //        List<CompanyDTO> getAllCompany = await _service.GetAllCompanies();
        //        return Ok(getAllCompany);

        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(new { error = ex.Message });

        //    }
        //}

        //[HttpPost]
        //[Route("/ModificarEmpresa")]

        //public async Task<IActionResult> ModifyCompany([FromBody] CompanyDTO company)
        //{
        //    try
        //    {
        //        await _service.ModifyCompany(company);
        //        return Ok(company);

        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(new { error = ex.Message });

        //    }
        //}

    }
}
