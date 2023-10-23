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
        private List<IObserver> observers = new List<IObserver>();

        public void RegisterObserver(IObserver observer)
        {
            observers.Add(observer);
        }

        public void RemoveObserver(IObserver observer)
        {
            observers.Remove(observer);
        }

        public void NotifyObservers(viewJobDTO job)
        {
            foreach (var observer in observers)
            {
                observer.Update(job);
            }
        }
    }
}

