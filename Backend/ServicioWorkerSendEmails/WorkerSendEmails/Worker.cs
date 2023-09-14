using Newtonsoft.Json;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Text;
using System.Threading.Channels;
using WorkerSendEmails.DTOs;
using WorkerSendEmails.Helpers;

namespace WorkerSendEmails
{
    public class Worker : BackgroundService
    {
        private readonly ILogger<Worker> _logger;

        public Worker(ILogger<Worker> logger)
        {
            _logger = logger;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            try {

                // Configuraci�n de RabbitMQ
                var factory = new ConnectionFactory()
                {
                    HostName = "localhost", // O la direcci�n IP de tu servidor RabbitMQ
                    UserName = "guest",
                    Password = "guest"
                };


                using (var connection = factory.CreateConnection())
                using (var channel = connection.CreateModel())
                {
                    // Declarar el nombre de la cola
                    string queueName = "EmailQueue";

                    // Declarar la cola en RabbitMQ (aseg�rate de que la cola ya est� creada previamente)
                    channel.QueueDeclare(queue: queueName,
                                         durable: false,
                                         exclusive: false,
                                         autoDelete: false,
                                         arguments: null);

                    // Configurar un consumidor de mensajes
                    var consumer = new EventingBasicConsumer(channel);

                    consumer.Received += (model, ea) =>
                    {
                        var body = ea.Body;
                        var message = Encoding.UTF8.GetString(body.ToArray());

                        // Deserializar el mensaje JSON en un objeto EmailDTO
                        var emailDto = JsonConvert.DeserializeObject<EmailDTO>(message);

                        // Procesar el mensaje (env�o de correo electr�nico, por ejemplo)
                        Console.WriteLine($"Mensaje recibido: {message}");
                        Console.WriteLine($"Destinatario: {emailDto.Destinatario}");
                        Console.WriteLine($"Asunto: {emailDto.Asunto}");

                        // Aqu� puedes llamar a tu m�todo de env�o de correo electr�nico con emailDto
                        EmailHelper.SendEmail(emailDto);

                        //se marca como recibido el mensaje
                        channel.BasicAck(ea.DeliveryTag, false);

                    };

                    // Comenzar a consumir mensajes de la cola
                    channel.BasicConsume(queue: queueName,
                                         autoAck: false, // Si se establece en true, los mensajes se marcan como entregados autom�ticamente
                                         consumer: consumer);
                    Console.WriteLine("se connecto a RabbitMQ correctamente");

                    Console.WriteLine("Presiona ENTER para detener el consumidor.");
                    Console.ReadLine();
                }

            } catch
            {
                Console.WriteLine("No se pudo conectar a RabbitMQ");
            }
        }
    }
}
