using BolsaDeTrabajo.Model.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BolsaDeTrabajo.Service.Interfaces
{
    public interface IUsuarioService
    {
        Task<UsuarioDTO> GetUsuarioByIdAsync(int id);
        Task<IEnumerable<UsuarioDTO>> GetAllUsuariosAsync();
        Task<UsuarioDTO> InsertUsuarioAsync(UsuarioDTO usuarioDTO);
        Task UpdateUsuarioAsync(UsuarioDTO usuarioDTO);
        Task DeleteUsuarioAsync(int id);
    }
}