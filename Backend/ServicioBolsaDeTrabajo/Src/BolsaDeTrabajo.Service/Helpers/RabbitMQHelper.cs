using Microsoft.EntityFrameworkCore.Metadata;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using RabbitMQ.Client.Exceptions;
using Newtonsoft.Json;

namespace BolsaDeTrabajo.Service.Helpers
{
    public class RabbitMQHelper
    {
        private readonly RabbitMQ.Client.IModel _channel;


        public void SendRabbitMessage(string destinatario, string asunto, string mensaje)
        {
            // Crear un objeto que represente el mensaje en un formato estructurado
            var mensajeJson = new
            {
                Destinatario = destinatario,
                Asunto = asunto,
                Contenido = mensaje
            };

            // Serializar el objeto a una cadena JSON
            var mensajeJsonString = JsonConvert.SerializeObject(mensajeJson);

            // Convertir la cadena JSON en bytes UTF-8
            var body = Encoding.UTF8.GetBytes(mensajeJsonString);


            // Configurar las propiedades del mensaje

            var properties = _channel.CreateBasicProperties();
            properties.ContentType = "text/plain";

            // Publicar el mensaje en la cola

            _channel.BasicPublish(exchange: "",
                                  routingKey: "EmailQueue",
                                  basicProperties: properties,
                                  body: body);
        }
    }
}
