using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BolsaDeTrabajo.Model.DTOs
{
    public class viewJobDTO
    {
        public int IdPuesto { get; set; }
        public int IdEmpresa { get; set; }


        public string Descripcion { get; set; }

        public string Titulo { get; set; }

        public bool Disponible { get; set; }
        public int Carrera { get; set; }
    }
}
