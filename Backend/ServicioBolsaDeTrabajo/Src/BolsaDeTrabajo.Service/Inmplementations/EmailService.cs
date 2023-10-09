using BolsaDeTrabajo.Model.DTOs;
using BolsaDeTrabajo.Service.Interfaces;
using MailKit.Security;
using MimeKit.Text;
using MimeKit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BolsaDeTrabajo.Service.Inmplementations
{
    public class EmailService : IEmailService
    {
        private readonly string _Host = "smtp.gmail.com";
        private readonly int _Port = 587;

        private readonly string _NameSend = "API USUARIO";

        private readonly string _Email = "josecaceresmusso3@gmail.com";
        private readonly string _Password = "hhdtwchmgnvchjrv";

        public async Task<bool> SendEmail(EmailDTO emaildto)
        {
            try
            {
                var email = new MimeMessage();
                email.From.Add(new MailboxAddress(_NameSend, _Email));
                email.To.Add(MailboxAddress.Parse(emaildto.Destinatario));
                email.Subject = emaildto.Asunto;
                email.Body = new TextPart(TextFormat.Html)
                {
                    Text = emaildto.Contenido
                };

                var smtp = new MailKit.Net.Smtp.SmtpClient();
                smtp.Connect(_Host, _Port, SecureSocketOptions.StartTls);
                smtp.Authenticate(_Email, _Password);
                smtp.Send(email);
                smtp.Disconnect(true);


                return true;
            }
            catch
            {
                return false;
            }

        }
    }
}
