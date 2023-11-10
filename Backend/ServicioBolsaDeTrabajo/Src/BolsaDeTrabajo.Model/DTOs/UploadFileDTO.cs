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
        public int StudentDni { get; set; }
        public IFormFile files { get; set; }


    }
}
