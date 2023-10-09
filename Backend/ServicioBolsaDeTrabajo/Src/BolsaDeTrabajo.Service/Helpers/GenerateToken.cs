using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BolsaDeTrabajo.Service.Helpers
{
   public class GenerateToken
    {
        public static string GenerateNumericToken()
        {
            var random = new Random();
            var token = "";

            for (int i = 0; i < 6; i++)
            {
                token += random.Next(0, 9).ToString();
            }

            return token;
        }
    }
}
