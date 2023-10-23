using BolsaDeTrabajo.Model.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BolsaDeTrabajo.Service.Interfaces
{
    public interface IObserver
    {
        Task<bool> Update(viewJobDTO job);
    }
}
