﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace BolsaDeTrabajo.Model.Models
{
    public partial class Empresas
    {
        public Empresas()
        {
            EmpresasPuestos = new HashSet<EmpresasPuestos>();
        }

        public int IdEmpresa { get; set; }
        public int IdUsuario { get; set; }
        public string Nombre { get; set; }
        public string Pais { get; set; }
        public string Ciudad { get; set; }
        public string Direccion { get; set; }
        public string Email { get; set; }
        public string CuitCuil { get; set; }

        public virtual ICollection<EmpresasPuestos> EmpresasPuestos { get; set; }
    }
}