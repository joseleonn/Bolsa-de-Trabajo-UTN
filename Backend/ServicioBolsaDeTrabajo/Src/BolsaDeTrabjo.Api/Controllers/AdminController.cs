using BolsaDeTrabajo.Data.Interfaces;
using BolsaDeTrabajo.Model.DTOs;
using BolsaDeTrabajo.Model.Models;
using BolsaDeTrabajo.Service.Implementations;
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
        private readonly IAdminRepository _adminRepository;
        public AdminController(IAdminService adminService, IAdminRepository adminRepository)
        {
            _adminService = adminService;
            _adminRepository = adminRepository;
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

        //[HttpPost]
        //[Route("/TestEmail")]
        //public ActionResult TestEmail(string destinatario, string asunto, string mensaje)
        //{
        //    try
        //    {
        //        _adminService.TestEmail(destinatario, asunto, mensaje);
        //        return Ok();
        //    }
        //    catch {
        //        return BadRequest();
        //    }
        //}

        [HttpPost]
        [Route("/InsertNewAdmin")]
        public async Task<IActionResult> NewAdmin([FromBody] AdminDTO admin)
        {
            try
            {
                await _adminService.InsertAdmin(admin);
                return CreatedAtAction(nameof(NewAdmin), null);

            }
            catch (Exception ex)
            {

                return BadRequest(new { error = ex.Message });

            }
        }
        [HttpDelete]
        [Route("/DeleteAdmin")]
        public async Task<IActionResult> Delete(int id)
        {
            await _adminService.DeleteAdmin(id);
            return NoContent();
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AdminDTO>>> GetAll()
        {
            var usuarios = await _adminService.GetAllAdmins();
            return Ok(usuarios);
        }

        [HttpDelete]
        [Route("DeleteAdminAndUser/{id}")]

        public async Task<IActionResult> DeleteStudent(int id)
        {
            await _adminService.DeleteAdminAndUser(id);
            return NoContent();
        }
    }
}
