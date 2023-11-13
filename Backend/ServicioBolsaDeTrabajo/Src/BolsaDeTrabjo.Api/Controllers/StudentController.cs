using BolsaDeTrabajo.Model.DTOs;
using BolsaDeTrabajo.Service.Helpers;
using BolsaDeTrabajo.Service.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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

                return CreatedAtAction(nameof(AddStudent), student);
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
                if (obj.files == null || obj.files.Length < 0)
                {
                    return BadRequest("No se cargó ningún archivo");
                }

                using MemoryStream ms = new MemoryStream();
                await obj.files.CopyToAsync(ms);
                byte[] fileBytes = ms.ToArray();

                await _service.PostPDF(fileBytes, obj.StudentDni);

                return Ok();
            }
            catch (FileNotFoundException ex)
            {
                return BadRequest("Archivo no encontrado: " + ex.Message);
            }
            catch (DbUpdateException ex)
            {
                // Maneja específicamente las excepciones relacionadas con la base de datos
                return BadRequest("Error de base de datos: " + ex.Message);
            }
            catch (Exception ex)
            {
                // Captura cualquier otra excepción no manejada
                return BadRequest("Error desconocido: " + ex.Message);
            }
        }

        [Authorize]
        [HttpGet]
        [Route("VerCurriculum/{studentDni}")]
        public async Task<IActionResult> GetPDF(int studentDni)
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

        [HttpPost("EliminarPorId")]
        public async Task<IActionResult> DeleteStudent(int id)
        {
            await _service.DeleteStudent(id);
            return NoContent();
        }
    }
}
