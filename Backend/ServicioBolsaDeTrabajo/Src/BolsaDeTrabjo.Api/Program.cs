using BolsaDeTrabajo.Model;
using BolsaDeTrabajo.Model.Models;
using BolsaDeTrabjo.Api;
using Microsoft.EntityFrameworkCore;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });
    c.OperationFilter<FileUploadOperation>();

    // Define la seguridad una sola vez
    c.AddSecurityDefinition("MyTestAuth", new OpenApiSecurityScheme
    {
        Type = SecuritySchemeType.Http,
        Scheme = "Bearer",
        Description = "Acá pegar el token generado al loguearse."
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "MyTestAuth"
                }
            },
            new List<string>()
        }
    });
});//CONNECT TO DATABASE
builder.Services.AddDbContext<BolsaDeTrabajoUTNContext>(opt => opt.UseSqlServer(builder.Configuration.GetConnectionString("SQLchain")));

//DEPENDENCY INJECTION
CompositeRoot.DependencyInjection(builder);


// Configuracion JWT
builder.Configuration.AddJsonFile("appsettings.json");
var secretKey = builder.Configuration.GetSection("AppSettings").GetSection("Key").ToString();
var Key = Encoding.UTF8.GetBytes(secretKey);
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = true;
    options.SaveToken = true;
    options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters()
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Key),
        ValidateIssuer = false,
        ValidateAudience = false
    };
});

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("Alumnos", policy => policy.RequireClaim("Tipo_Usuario", "1"));
    options.AddPolicy("Empresas", policy => policy.RequireClaim("Tipo_Usuario", "2"));
    options.AddPolicy("Admin", policy => policy.RequireClaim("Tipo_Usuario", "3"));
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost5173", builder =>
    {
        builder.WithOrigins("http://localhost:5173")
               .AllowAnyHeader()
               .AllowAnyMethod();
    });
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
    });
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();
app.UseCors("AllowLocalhost5173");

app.MapControllers();

app.Run();
