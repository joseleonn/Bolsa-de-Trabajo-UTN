using BolsaDeTrabajo.Data.Implementations;
using BolsaDeTrabajo.Data.Interfaces;
using BolsaDeTrabajo.Model;
using BolsaDeTrabajo.Model.DTOs;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BolsaDeTrabajo.Service.Interfaces
{
    public class EmailNotificationObserver : IObserver
    {
        private readonly IEmailService _email;
        private readonly ISuscriptorRepository _suscriptorRepository;
        private readonly IUsuarioRepository _usuarioRepository;


        public EmailNotificationObserver(IEmailService email, ISuscriptorRepository suscriptorRepository, IUsuarioRepository usuarioRepository)
        {
            _email = email;
            _suscriptorRepository = suscriptorRepository;
            _usuarioRepository = usuarioRepository;
        }


        public async Task<bool> Update(viewJobDTO job)
        {
            try
            {
                // Obtén la lista de suscriptores
                List<SuscriptoresDTO> suscriptores = await _suscriptorRepository.GetAllSuscriptores();

                foreach (var suscriptor in suscriptores)
                {
                    // Obtiene el email del suscriptor basado en su IdUsuario
                    UsuariosDTO user = await _usuarioRepository.GetUsuarioById(suscriptor.IdUsuario);

                    if (user != null)
                    {
                        // Crea y envía un correo a cada suscriptor
                        EmailDTO newEmail = new EmailDTO()
                        {
                            Destinatario = user.Email,
                            Asunto = "Nuevos trabajos",
                            Contenido = ("Nuevos trabajos Disponibles! Consultalos en la web!")
                        };

                        bool send = await _email.SendEmail(newEmail);

                        if (!send)
                        {
                            throw new Exception("El correo no se envió a uno de los suscriptores.");
                        }
                    }
                }
                return true; // Se enviaron los correos a todos los suscriptores.
            }
            catch (Exception ex)
            {
                throw new Exception("Error al enviar correos a los suscriptores: " + ex.Message);
            }
        }
    }
}
