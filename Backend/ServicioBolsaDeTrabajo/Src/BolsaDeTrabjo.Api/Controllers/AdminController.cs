using BolsaDeTrabajo.Model.Models;
using BolsaDeTrabajo.Service.Interfaces;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BolsaDeTrabjo.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IAdminService _adminService;
        public AdminController(IAdminService adminService)
        {
            _adminService = adminService;
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var user = await _adminService.GetByIdAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        [HttpPost]
        [Route("/TestEmail")]
        public ActionResult TestEmail(string destinatario, string asunto, string mensaje)
        {
            try
            {
                _adminService.TestEmail(destinatario, asunto, mensaje);
                return Ok();
            }
            catch {
                return BadRequest();
            }
        }

    }
}
