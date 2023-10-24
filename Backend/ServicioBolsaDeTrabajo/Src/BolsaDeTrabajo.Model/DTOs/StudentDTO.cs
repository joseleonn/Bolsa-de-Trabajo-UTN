using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BolsaDeTrabajo.Model.DTOs
{
    public class StudentDTO
    {
        public string Email { get; set; }
        public string Contrasenia { get; set; } 
        public int TipoUsuario { get; set; }
        public string Dni { get; set; }
        public string Nombre { get; set; }

        public byte[]? Curriculum {  get; set; }
        public string Apellido { get; set; }
        public string Celular { get; set; }
        public string Nacionalidad { get; set; }
        public string Pais { get; set; }
        public string Ciudad { get; set; }
        public string Direccion { get; set; }
    }
}
