using BolsaDeTrabajo.Model;
using BolsaDeTrabajo.Model.Models;
using BolsaDeTrabjo.Api;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//CONNECT TO DATABASE
builder.Services.AddDbContext<BolsaDeTrabajoUTNContext>(opt => opt.UseSqlServer(builder.Configuration.GetConnectionString("SQLchain")));

//DEPENDENCY INJECTION
CompositeRoot.DependencyInjection(builder);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
