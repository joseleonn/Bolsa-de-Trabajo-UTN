﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace BolsaDeTrabajo.Model.Models;

public partial class Tokens
{
    public string Token { get; set; }

    public int IdUsuario { get; set; }

    public string FechaGeneracion { get; set; }

    public string FechaExpiracion { get; set; }

    public bool Valido { get; set; }

    public virtual Usuarios IdUsuarioNavigation { get; set; }
}