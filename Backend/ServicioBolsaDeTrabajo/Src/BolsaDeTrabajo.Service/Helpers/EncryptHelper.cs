using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Security.Cryptography;
using static System.Net.Mime.MediaTypeNames;

namespace BolsaDeTrabajo.Service.Helpers
{
    
        public class EncryptHelper : IEncryptHelper
        {
        public string GetSHA256(string Clave)
        {

            using (SHA256 sha256 = SHA256Managed.Create())
            {

                ASCIIEncoding encoding = new ASCIIEncoding();
                byte[] stream = sha256.ComputeHash(encoding.GetBytes(Clave));
                StringBuilder sb = new StringBuilder();
                for (int i = 0; i < stream.Length; i++)
                {
                    sb.AppendFormat("{0:x2}", stream[i]);
                }
                return sb.ToString();
            }
        }

        }
    
}
