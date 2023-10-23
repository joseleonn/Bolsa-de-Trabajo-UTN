using BolsaDeTrabajo.Model.DTOs;
using BolsaDeTrabajo.Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BolsaDeTrabajo.Service.Interfaces
{
    public interface ISubject
    {
        void RegisterObserver(IEmailNotificationObserver observer);
        void RemoveObserver(IEmailNotificationObserver observer);
        void NotifyObservers(viewJobDTO viewJob);
    }
}