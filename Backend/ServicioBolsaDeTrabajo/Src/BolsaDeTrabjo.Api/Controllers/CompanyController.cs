using BolsaDeTrabajo.Model.DTOs;
using BolsaDeTrabajo.Service.Interfaces;
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

        [HttpPost]
        [Route("/ModificarEmpresa")]

        public async Task<IActionResult> ModifyCompany([FromBody] CompanyDTO company)
        {
            try
            {
                await _service.ModifyCompany(company);
                return Ok(company);

            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });

            }
        }
    }
}
