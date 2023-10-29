using System;
using System.Threading.Tasks;
using Xunit;
using Moq;
using BolsaDeTrabajo.Service.Inmplementations;
using BolsaDeTrabajo.Data.Interfaces;
using BolsaDeTrabajo.Model.DTOs;
using BolsaDeTrabajo.Service.Interfaces;

public class JobServiceTests
{
    [Theory]
    [InlineData(true, true)] 
    [InlineData(false, false)] 
    public async Task AddJob_JobAdded_SuccessOrFailure(bool expectedResult, bool shouldNotify)
    {
        
        var jobRepositoryMock = new Mock<IJobRepository>();
        var emailNotificationObserverMock = new Mock<IEmailNotificationObserver>();

        var jobService = new JobService(jobRepositoryMock.Object, emailNotificationObserverMock.Object);

        var jobToAdd = new AddJobDTO
        {
            IdEmpresa = 1,
            Titulo = "Trabajo de prueba",
            Descripcion = "Este es un trabajo de prueba",
            Disponible = true
        };

        jobRepositoryMock.Setup(r => r.AddJob(jobToAdd)).ReturnsAsync(expectedResult);

       
        var result = await jobService.AddJob(jobToAdd);

        
        Assert.Equal(expectedResult, result);

       
        if (shouldNotify)
        {
            emailNotificationObserverMock.Verify(e => e.NotifySubscriptors(), Times.Once);
        }
        else
        {
            emailNotificationObserverMock.Verify(e => e.NotifySubscriptors(), Times.Never);
        }
    }

   
}
