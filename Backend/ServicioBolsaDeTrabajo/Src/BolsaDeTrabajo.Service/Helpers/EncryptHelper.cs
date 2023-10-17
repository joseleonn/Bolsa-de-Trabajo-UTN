using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Security.Cryptography;
using static System.Net.Mime.MediaTypeNames;

namespace BolsaDeTrabajo.Service.Helpers
{
    
        public class EncryptHelper
        {
            public static string GetSHA256 (string text)
            {
            string hash = string.Empty;

            using (SHA256 sha256 = SHA256.Create())
            {

                //OBETENR EL HASH DEL TEXTO RECIBIDO 

                byte[] hashvalue = sha256.ComputeHash(Encoding.UTF8.GetBytes(text));


                //CONVERTIR EL ARRAY BYTE EN CADENA DE TEXTO

                foreach (byte b in hashvalue)
                {
                    hash += $"{b:X2}";
                }
                return hash;
            }
        }

        }
    
}
