using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace BolsaDeTrabjo.Api
{
    public class FileUploadOperation : IOperationFilter
    {
        public void Apply(OpenApiOperation operation, OperationFilterContext context)
        {
            var fileUploadParameters = context.MethodInfo.GetParameters()
                .Where(p => p.ParameterType == typeof(IFormFile))
                .Select(p => new OpenApiParameter
                {
                    Name = p.Name,
                    In = ParameterLocation.Query,
                    Description = "Carga de archivo",
                    Required = true,
                    Schema = new OpenApiSchema
                    {
                        Type = "file",
                        Format = "binary"
                    }
                }).ToList();

            if (fileUploadParameters.Any())
            {
                foreach (var parameter in fileUploadParameters)
                {
                    operation.Parameters.Add(parameter);
                }
            }
        }
    }


}
