using BolsaDeTrabajo.Model.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BolsaDeTrabajo.Data.Interfaces
{
    public interface IUsuarioRepository
    {
        // Obtener un usuario por su ID
        Task<Usuarios?> GetUsuarioById(int id);

        // Obtener todos los usuarios
        Task<IEnumerable<Usuarios>> GetAllUsuarios();

        // Insertar un nuevo usuario
        Task<Usuarios?> InsertUsuario(Usuarios usuario);

        // Actualizar un usuario existente
        Task UpdateUsuario(Usuarios usuario);

        // Eliminar un usuario por su ID
        Task DeleteUsuario(int id);
        
        Task<Usuarios?> GetUsuarioByEmail (string email);
    }
}