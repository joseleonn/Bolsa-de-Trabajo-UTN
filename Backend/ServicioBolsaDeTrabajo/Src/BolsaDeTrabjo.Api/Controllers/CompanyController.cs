using BolsaDeTrabajo.Model.DTOs;
using BolsaDeTrabajo.Service.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BolsaDeTrabjo.Api.Controllers
{
 
    [Route("api/[controller]")]
    [ApiController]
    public class CompanyController : Controller
    {
        private readonly ICompanyService _service;
        public CompanyController(ICompanyService service)
        {
            _service = service;
        }

        [HttpPost]
        [Route("/CargarEmpresa")]

        public async Task<IActionResult> AddCompany([FromBody]NewCompanyDTO company)
        {
            try
            {
               await _service.AddCompany(company);
                return CreatedAtAction(nameof(AddCompany), null); 

            }
            catch (Exception ex)
            {

                return BadRequest(new { error = ex.Message });

            }
        }


        [HttpGet]
        [Route("/BuscarEmpresa/{id}")]

        public async Task<IActionResult> AddCompany(int id)
        {
            try
            {
                CompanyDTO getCompany = await _service.GetCompanyById(id);
                return Ok(getCompany);

            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });

            }
        }


        [HttpGet]
        [Route("/ListaEmpresas")]

        public async Task<IActionResult> GetAllCompanies()
        {
            try
            {
                List<CompanyDTO> getAllCompany = await _service.GetAllCompanies();
                return Ok(getAllCompany);

            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });

            }
        }

        [Authorize]
        [HttpPost]
        [Route("ModificarEmpresa")]
        public async Task<IActionResult> ModifyCompanyAndUser([FromBody] CompanyDTO company)
        {
            try
            {
                await _service.ModifyCompanyAndUser(company);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest("Error al modificar: " + ex.Message);
            }
        }

        [HttpPost("EliminarPorId")]

        public async Task<IActionResult> DeleteCompany(int id)
        {
            await _service.DeleteCompany(id);
            return NoContent();
        }
    }
}
