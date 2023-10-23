using BolsaDeTrabajo.Data.Interfaces;
using BolsaDeTrabajo.Model.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace BolsaDeTrabjo.Api.Controllers
{
    [Route("Suscriptor")]
    [ApiController]
    public class SuscriptorController : ControllerBase
    {
        private readonly ISuscriptorRepository _suscriptorRepository;

        public SuscriptorController(ISuscriptorRepository suscriptorRepository)
        {
            _suscriptorRepository = suscriptorRepository;
        }

        [HttpPost]
        [Route("/Agregar Suscriptor")]
        public async Task<IActionResult> CreateSuscriptor([FromBody] SuscriptoresDTO suscriptor)
        {
            try
            {
                await _suscriptorRepository.CreateSuscriptor(suscriptor);
                return CreatedAtAction(nameof(CreateSuscriptor), null);

            }
            catch (Exception ex)
            {

                return BadRequest(new { error = ex.Message });

            }
        }
    }
}
