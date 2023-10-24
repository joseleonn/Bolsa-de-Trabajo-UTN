using BolsaDeTrabajo.Model.DTOs;
using BolsaDeTrabajo.Service.Interfaces;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BolsaDeTrabjo.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {

        private readonly IStudentService _service;

        public StudentController(IStudentService service)
        {
            _service = service;
        }

        [HttpGet]
        [Route("TodosLosEstudiantes")]
        public async Task<IActionResult> GetAllStudents()
        {
            try
            {
                List<StudentDTO> response = await _service.GetAllStudents();
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest("Error al listar datos: " + ex.Message);
            }
        }

        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }
        [HttpPost]
        [Route("CrearUsuarioEstudiante")]
        public async Task<IActionResult> AddStudent([FromBody] StudentDTO student)
        {
            try
            {
                await _service.AddStudent(student);

                return CreatedAtAction(nameof(AddStudent), null);
            }
            catch
            {
                return BadRequest();
            }
        }
        // PUT api/<StudentController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<StudentController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
