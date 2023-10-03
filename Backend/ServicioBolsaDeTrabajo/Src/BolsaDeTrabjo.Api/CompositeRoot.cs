using BolsaDeTrabajo.Data.Implementations;
using BolsaDeTrabajo.Data.Inmplementations;
using BolsaDeTrabajo.Data.Interfaces;
using BolsaDeTrabajo.Service.Helpers;
using BolsaDeTrabajo.Service.Implementations;
using BolsaDeTrabajo.Service.Inmplementations;
using BolsaDeTrabajo.Service.Interfaces;

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


            //REPOSITORIES
            builder.Services.AddScoped<IAdminRepository, AdminRepository>();
            builder.Services.AddScoped<ICompanyRepository, CompanyRepository>();
            builder.Services.AddScoped<IJobRepository, JobRepository>();
            builder.Services.AddScoped<IUsuarioRepository, UsuarioRepository>();


            //Helpers
            builder.Services.AddScoped<RabbitMQHelper>();
        }
    }
}
