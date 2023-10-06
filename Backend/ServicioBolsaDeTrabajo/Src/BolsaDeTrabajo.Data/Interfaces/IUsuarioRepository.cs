using BolsaDeTrabajo.Model.DTOs;
using BolsaDeTrabajo.Model.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BolsaDeTrabajo.Data.Interfaces
{
    public interface IUsuarioRepository
    {
        // Obtener un usuario por su ID
        Task<UsuariosDTO?> GetUsuarioById(int id);

        // Obtener todos los usuarios
        Task<List<UsuariosDTO>> GetAllUsuarios();

        // Insertar un nuevo usuario
        Task<bool> InsertUsuario(UsuariosDTO usuario);

        // Actualizar un usuario existente
        Task<bool> UpdateUsuario(UsuariosDTO usuario);

        // Eliminar un usuario por su ID
        Task DeleteUsuario(int id);
        
        Task<UsuariosDTO> GetUsuarioByEmail (string email);
    }
}