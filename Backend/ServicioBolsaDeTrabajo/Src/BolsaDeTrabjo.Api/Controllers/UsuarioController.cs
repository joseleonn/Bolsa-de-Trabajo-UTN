using BolsaDeTrabajo.Model.DTOs;
using BolsaDeTrabajo.Model.Models;
using BolsaDeTrabajo.Service.Implementations;
using BolsaDeTrabajo.Service.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace BolsaDeTrabajo.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private readonly IUsuarioService _usuarioService;

        public UsuarioController(IUsuarioService usuarioService)
        {
            _usuarioService = usuarioService;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UsuariosDTO>> GetById(int id)
        {
            var usuario = await _usuarioService.GetUsuarioByIdAsync(id);

            if (usuario == null)
            {
                return NotFound();
            }

            return Ok(usuario);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UsuariosDTO>>> GetAll()
        {
            var usuarios = await _usuarioService.GetAllUsuariosAsync();
            return Ok(usuarios);
        }

        [HttpPost]
        public async Task<IActionResult> InsertUsuarioAsync([FromBody] UsuariosDTO usuario)
        {
            try
            {
                await _usuarioService.InsertUsuarioAsync(usuario);
                return CreatedAtAction(nameof(InsertUsuarioAsync), null);

            }
            catch (Exception ex)
            {

                return BadRequest(new { error = ex.Message });

            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] UsuariosDTO usuarioDTO)
        {
            if (id != usuarioDTO.IdUsuario)
            {
                return BadRequest();
            }

            // Aquí estamos enviando el objeto UsuarioDTO al servicio para que se actualice,
            // incluyendo la contraseña si se proporciona.
            await _usuarioService.UpdateUsuarioAsync(usuarioDTO);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _usuarioService.DeleteUsuarioAsync(id);
            return NoContent();
        }

        [HttpPost]
        [Route("CambiarContrasenia")]
        public async Task<ActionResult> ChangePassword([FromBody] UsuarioDTO usuarioDTO)
        {
            try
            {
                await _usuarioService.ChangePassword(usuarioDTO);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpPost]
        [Route("VerificarToken/{token}")]
        public async Task<ActionResult> VerifyToken(string token)
        {
            try
            {
                await _usuarioService.VerifyToken(token);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest("El token no coincide");
            }
        }
    }
}