﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BolsaDeTrabajo.Model.DTOs
{
    public class InsertUsuarioDTO
    {
        public string Email { get; set; }
        public string Contrasenia { get; set; } // Nueva propiedad para la contraseña
        public int TipoUsuario { get; set; }

    }
}
