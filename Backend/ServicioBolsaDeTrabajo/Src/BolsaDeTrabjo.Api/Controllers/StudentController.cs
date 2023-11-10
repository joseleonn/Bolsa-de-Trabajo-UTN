using BolsaDeTrabajo.Model.DTOs;
using BolsaDeTrabajo.Service.Helpers;
using BolsaDeTrabajo.Service.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BolsaDeTrabjo.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {

        private readonly IStudentService _service;
        private readonly IEncryptHelper _encryptHelper;
        public StudentController(IStudentService service, IEncryptHelper encryptHelper)
        {
            _service = service;
            _encryptHelper = encryptHelper;
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
        [Authorize]
        [HttpPost]
        [Route("CargarCurriculum")]
        public async Task<IActionResult> PostPDF([FromForm] UploadFileDTO obj)
        {

            try
            {
                if (obj.files == null || obj.files.Length == 0)
                {
                    return BadRequest("No se cargo ningun archivo");
                }

                // Lee el archivo y conviértelo en un array de bytes
                using MemoryStream ms = new MemoryStream();
                await obj.files.CopyToAsync(ms);
                byte[] fileBytes = ms.ToArray();

                await _service.PostPDF(fileBytes, obj.StudentDni);

                return Ok();
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }

        }
        [Authorize]
        [HttpGet]
        [Route("VerCurriculum/{studentDni}")]
        public async Task<IActionResult> GetPDF(string studentDni)
        {
            try
            {
                // Obtiene el currículum del estudiante como un array de bytes
                byte[] fileBytes = await _service.GetPDF(studentDni);

                if (fileBytes == null || fileBytes.Length == 0)
                {
                    return NotFound("No se encontró ningún currículum para el estudiante con DNI " + studentDni);
                }

                // Convierte el array de bytes en un MemoryStream
                var ms = new MemoryStream(fileBytes);

                // Retorna el archivo para abrirse en el navegador en lugar de descargarse
                Response.Headers.Add("Content-Disposition", "inline; filename=" + studentDni + ".pdf");
                return File(ms, "application/octet-stream");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpGet]
        [Route("{idUser}")]
        public async Task<IActionResult> GetStudentById(int idUser)
        {
            try
            {
                StudentDTO response = await _service.GetStudentById(idUser);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest("Error al traer datos: " + ex.Message);
            }
        }


        [Authorize]
        [HttpPost]
        [Route("ModificarAlumno")]
        public async Task<IActionResult> ModifyUserAndStudent([FromBody] StudentDTO student)
        {
            try
            {
                await _service.ModifyUserAndStudent(student);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest("Error al modificar: " + ex.Message);
            }
        }
        [HttpDelete("{id}")]

        public async Task<IActionResult> DeleteStudent(int id)
        {
            await _service.DeleteStudent(id);
            return NoContent();
        }
    }
}
