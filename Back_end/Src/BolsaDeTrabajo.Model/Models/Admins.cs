﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace BolsaDeTrabajo.Model.Models;

public partial class Admins
{
    public int IdAdmin { get; set; }

    public int IdUsuario { get; set; }

    public int RolAdmin { get; set; }

    public virtual Usuarios IdUsuarioNavigation { get; set; }

    public virtual TiposAdmin RolAdminNavigation { get; set; }
}