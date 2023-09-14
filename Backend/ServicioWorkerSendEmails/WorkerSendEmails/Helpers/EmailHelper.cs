using MailKit.Security;
using MimeKit;
using MimeKit.Text;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using WorkerSendEmails.DTOs;
using MailKit.Net.Smtp;

namespace WorkerSendEmails.Helpers
{
    public class EmailHelper
    {
        private static string _Host = "smtp.gmail.com";
        private static int _Port = 587;

        private static string _NameSend = "API USUARIO";

        private static string _Email = "josecaceresmusso3@gmail.com";
        private static string _Password = "hhdtwchmgnvchjrv";

        public static bool SendEmail(EmailDTO correodto)
        {
            try
            {
                var email = new MimeMessage();
                email.From.Add(new MailboxAddress(_NameSend, _Email));
                email.To.Add(MailboxAddress.Parse(correodto.Destinatario));
                email.Subject = correodto.Asunto;
                email.Body = new TextPart(TextFormat.Html)
                {
                    Text = correodto.Contenido
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
