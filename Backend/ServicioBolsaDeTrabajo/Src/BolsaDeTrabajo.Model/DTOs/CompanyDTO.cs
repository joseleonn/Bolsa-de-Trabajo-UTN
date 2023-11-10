using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BolsaDeTrabajo.Model.DTOs
{
    public class CompanyDTO
    {
        public int IdEmpresa { get; set; }

        public int IdUsuario { get; set; }

        public string Nombre { get; set; }

        public string Pais { get; set; }

        public string Ciudad { get; set; }

        public string Direccion { get; set; }
        public string Email { get; set; }
        public string CuitCuil { get; set; }
    }
}
