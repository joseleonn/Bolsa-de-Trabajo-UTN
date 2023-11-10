using BolsaDeTrabajo.Model.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BolsaDeTrabajo.Service.Interfaces
{
    public interface ICompanyService
    {
        Task AddCompany(NewCompanyDTO company);
        //Task AddCompany(CompanyDTO company);
        Task<CompanyDTO> GetCompanyById(int id);
        Task<List<CompanyDTO>> GetAllCompanies();
        Task ModifyCompany(CompanyDTO company);
        Task ModifyCompanyAndUser(CompanyDTO company);
    }
}
