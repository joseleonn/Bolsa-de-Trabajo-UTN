﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace BolsaDeTrabajo.Model.Models
{
    public partial class PuestosDeTrabajoPostulaciones
    {
        public int IdPuestosDeTrabajoPostulaciones { get; set; }
        public int IdPuestoDeTrabajo { get; set; }
        public int IdPostulacion { get; set; }
        public int? IdUsuario { get; set; }

        public virtual Postulaciones IdPostulacionNavigation { get; set; }
        public virtual PuestosDeTrabajo IdPuestoDeTrabajoNavigation { get; set; }
    }
}