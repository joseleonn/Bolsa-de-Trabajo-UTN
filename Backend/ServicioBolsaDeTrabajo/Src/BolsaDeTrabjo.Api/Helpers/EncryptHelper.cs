﻿using System.Security.Cryptography;
using System.Text;

namespace BolsaDeTrabjo.Api.Helpers
{
    
    
        public static class EncryptHelper
    {
            public static string GetSHA256(this string Clave)
            {
                SHA256 sha256 = SHA256Managed.Create();
                ASCIIEncoding encoding = new ASCIIEncoding();
                byte[] stream = null;
                StringBuilder sb = new StringBuilder();
                stream = sha256.ComputeHash(encoding.GetBytes(Clave));
                for (int i = 0; i < stream.Length; i++) sb.AppendFormat("{0:x2}", stream[i]);
                return sb.ToString();
            }

        }
    
}
