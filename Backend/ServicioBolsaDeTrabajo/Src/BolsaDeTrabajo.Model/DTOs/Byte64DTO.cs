using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BolsaDeTrabajo.Model.DTOs
{
    public class Byte64DTO
    {
        public int StudentDni { get; set; }
        public byte[] files { get; set; }
    }
}
