﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace BolsaDeTrabajo.Model.Models
{
    public partial class PuestosDeTrabajo
    {
        public PuestosDeTrabajo()
        {
            PuestosDeTrabajoPostulaciones = new HashSet<PuestosDeTrabajoPostulaciones>();
        }

        public int IdPuesto { get; set; }
        public int IdEmpresa { get; set; }
        public string Descripcion { get; set; }
        public string Titulo { get; set; }
        public bool Disponible { get; set; }
        public int IdCarrera { get; set; }

        public virtual ICollection<PuestosDeTrabajoPostulaciones> PuestosDeTrabajoPostulaciones { get; set; }
    }
}