using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BolsaDeTrabajo.Model.DTOs
{
    public class MyAplicatedJobsDTO
    {
        public int IdPostulacion { get; set; }
        public string DniAlumno { get; set; }
        public int Estado { get; set; }

        public int IdPuesto { get; set; }
        public int IdEmpresa { get; set; }
        public string Descripcion { get; set; }
        public string Titulo { get; set; }
        public bool Disponible { get; set; }

        public string RazonSocial { get; set; }

    }
}
