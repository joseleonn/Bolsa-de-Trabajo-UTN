using BolsaDeTrabajo.Model.DTOs;
using BolsaDeTrabajo.Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BolsaDeTrabajo.Service.Inmplementations
{
    public class Subject : ISubject
    {
        private List<IEmailNotificationObserver> observers = new List<IEmailNotificationObserver>();

        public void NotifyObservers(viewJobDTO viewJob)
        {
            throw new NotImplementedException();
        }

        public void RegisterObserver(IEmailNotificationObserver observer)
        {
            observers.Add(observer);
        }

        public void RemoveObserver(IEmailNotificationObserver observer)
        {
            observers.Remove(observer);
        }

        //public void NotifyObservers(viewJobDTO job)
        //{
        //    foreach (var observer in observers)
        //    {
        //        observer.Update(job);
        //    }
        //}
    }
}

