using BolsaDeTrabajo.Data.Inmplementations;
using BolsaDeTrabajo.Data.Interfaces;
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
            builder.Services.AddScoped<IAuthService, AuthService>();
            builder.Services.AddScoped<IEntrepriseService, EntrepriseService>();
            builder.Services.AddScoped<IStudentService, StudentService>();

            //REPOSITORIES
            builder.Services.AddScoped<IAdminRepository, AdminRepository>();



        }
    }
}
