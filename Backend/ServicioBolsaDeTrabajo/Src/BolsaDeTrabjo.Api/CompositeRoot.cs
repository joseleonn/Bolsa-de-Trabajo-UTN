using BolsaDeTrabajo.Data.Implementations;
using BolsaDeTrabajo.Data.Inmplementations;
using BolsaDeTrabajo.Data.Interfaces;
using BolsaDeTrabajo.Service.Helpers;
using BolsaDeTrabajo.Service.Implementations;
using BolsaDeTrabajo.Service.Inmplementations;
using BolsaDeTrabajo.Service.Interfaces;
using BolsaDeTrabjo.Api.Helpers;

namespace BolsaDeTrabjo.Api
{
    public class CompositeRoot
    {
        public static void DependencyInjection(WebApplicationBuilder builder)
        {
            //SERVICES
            builder.Services.AddScoped<IAdminService, AdminService>();
            builder.Services.AddScoped<IEntrepriseService, EntrepriseService>();
            builder.Services.AddScoped<IStudentService, StudentService>();
            builder.Services.AddScoped<IUsuarioService, UsuarioService>();
            builder.Services.AddScoped<ICompanyService, CompanyService>();
            builder.Services.AddScoped<IJobService, JobService>();
            builder.Services.AddScoped<IEmailService, EmailService>();

            //REPOSITORIES
            builder.Services.AddScoped<IAdminRepository, AdminRepository>();
            builder.Services.AddScoped<ICompanyRepository, CompanyRepository>();
            builder.Services.AddScoped<IJobRepository, JobRepository>();
            builder.Services.AddScoped<IUsuarioRepository, UsuarioRepository>();
            builder.Services.AddScoped<IStudentRepository, StudentRepository>();


            //Helpers
            builder.Services.AddScoped<RabbitMQHelper>();
            builder.Services.AddScoped<GenerateToken>();
            builder.Services.AddScoped<IEncryptHelper, EncryptHelper>();

        }
    }
}
