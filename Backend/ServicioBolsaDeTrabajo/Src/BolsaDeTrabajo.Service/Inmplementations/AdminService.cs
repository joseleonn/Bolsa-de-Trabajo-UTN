using BolsaDeTrabajo.Data.Interfaces;
using BolsaDeTrabajo.Model.DTOs;
using BolsaDeTrabajo.Model.Models;
using BolsaDeTrabajo.Service.Helpers;
using BolsaDeTrabajo.Service.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BolsaDeTrabajo.Service.Inmplementations
{
    public class AdminService : IAdminService
    {
        private readonly IAdminRepository _adminRepository;
        private readonly IUsuarioRepository _usuarioRepository;

        public AdminService(IUsuarioRepository usuarioRepository, IAdminRepository adminRepository)
        {
            _adminRepository = adminRepository;
            _usuarioRepository = usuarioRepository;
        }

        public async Task InsertAdmin(AdminDTO admin)
        {
            if (admin != null)
            {
                UsuariosDTO usuario = await _usuarioRepository.GetUsuarioById(admin.IdUsuario);

                UsuariosDTO modifiedUser = new UsuariosDTO()
                {
                    IdUsuario = usuario.IdUsuario,
                    Email = usuario.Email,
                    Contrasenia = usuario.Contrasenia,
                    TipoUsuario = 3
                };
                await _usuarioRepository.UpdateUsuario(modifiedUser);

                await _adminRepository.InsertAdmin(admin);
            }
            else
            {
                throw new Exception("El admin es null");
            }
        }
        public async Task<AdminDTO> GetByIdAsync(int id)
        {
            Admins admin = await _adminRepository.GetAdminById(id);

            if(admin != null) {
                AdminDTO request = new AdminDTO
                {
                    IdAdmin = admin.IdAdmin,
                    IdUsuario = admin.IdUsuario,
                    RolAdmin = admin.RolAdmin,
                };
                return request;
            }
            else
            {
                return null;
            }

           
        }

        public async Task<List<AdminDTO>> GetAllAdmins()
        {
            List<AdminDTO> listOfAdmins = await _adminRepository.GetAllAdmins();

            if (listOfAdmins != null)
            {
                return listOfAdmins;

            }
            else
            {
                throw new Exception("Error al traer todos los admins");
            }
        }

        public async Task DeleteAdmin(int id)
        {
            // Llama al método del repositorio para eliminar un usuario por su ID
            Admins admin = await _adminRepository.GetAdminById(id);
            if (admin != null)
            {
                UsuariosDTO usuario = await _usuarioRepository.GetUsuarioById(admin.IdUsuario);

                UsuariosDTO modifiedUser = new UsuariosDTO()
                {
                    IdUsuario = usuario.IdUsuario,
                    Email = usuario.Email,
                    Contrasenia = usuario.Contrasenia,
                    TipoUsuario = 1
                };

                await _usuarioRepository.UpdateUsuario(modifiedUser);
            }
            await _adminRepository.DeleteAdmin(id);


        }
        public async Task DeleteAdminAndUser(int id)
        {
            try
            {
                await _adminRepository.DeleteAdminAndUser(id);
            }
            catch (Exception ex)
            {
                throw new Exception("error en el servicio" + ex);
            }
        }
    }
}
