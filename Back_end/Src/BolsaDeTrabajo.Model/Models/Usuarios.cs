﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace BolsaDeTrabajo.Model.Models;

public partial class Usuarios
{
    public int IdUsuario { get; set; }

    public string Email { get; set; }

    public string Contrasenia { get; set; }

    public int TipoUsuario { get; set; }

    public virtual ICollection<Admins> Admins { get; set; } = new List<Admins>();

    public virtual ICollection<Alumnos> Alumnos { get; set; } = new List<Alumnos>();

    public virtual ICollection<Empresas> Empresas { get; set; } = new List<Empresas>();

    public virtual TiposUsuarios TipoUsuarioNavigation { get; set; }

    public virtual ICollection<Tokens> Tokens { get; set; } = new List<Tokens>();
}