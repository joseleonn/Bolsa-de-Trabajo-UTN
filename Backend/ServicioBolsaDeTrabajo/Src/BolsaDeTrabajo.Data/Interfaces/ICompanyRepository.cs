using BolsaDeTrabajo.Model.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BolsaDeTrabajo.Data.Interfaces
{
    public interface ICompanyRepository
    {
        Task AddCompany(NewCompanyDTO newCompany);
        //Task<bool> AddCompany(CompanyDTO company);
        Task<CompanyDTO> GetCompanyById(int id);
        Task<List<CompanyDTO>> GetAllCompanies();

        Task<bool> ModifyCompany(CompanyDTO company);



    }
}
