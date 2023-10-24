using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BolsaDeTrabajo.Model.DTOs
{
    public class UploadFileDTO
    {
        public string StudentDni { get; set; }
        public IFormFile files { get; set; }
    }
}
