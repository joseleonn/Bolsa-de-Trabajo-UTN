﻿using BolsaDeTrabajo.Model.DTOs;
using BolsaDeTrabajo.Service.Implementations;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BolsaDeTrabajo.Service.Interfaces
{
    public interface IUsuarioService
    {
        Task<UsuariosDTO> GetUsuarioByIdAsync(int id);
        Task<List<UsuariosDTO>> GetAllUsuariosAsync();
        Task UpdateUsuarioAsync(UsuariosDTO usuarioDTO);
        Task DeleteUsuarioAsync(int id);

        Task ChangePassword(string email);

        Task VerifyToken(string token);

    }
}