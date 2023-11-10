using BolsaDeTrabajo.Data.Interfaces;
using BolsaDeTrabajo.Model.DTOs;
using BolsaDeTrabajo.Service.Helpers;
using BolsaDeTrabajo.Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BolsaDeTrabajo.Service.Inmplementations
{
    public class CompanyService : ICompanyService
    {
        private readonly ICompanyRepository _repository;
        private readonly IEncryptHelper _encrypt;
        public CompanyService(ICompanyRepository repository,IEncryptHelper encrypt)
        {
            _repository = repository;
            _encrypt = encrypt;
        }
        public async Task AddCompany(NewCompanyDTO company)
        {
            if (company != null)
            {
                string hashedPassword = _encrypt.GetSHA256(company.Contrasenia);

                company.Contrasenia = hashedPassword;
                await _repository.AddCompany(company);
            }
            else
            {
                throw new Exception("La empresa es null");
            }

        }

        public async Task<CompanyDTO>GetCompanyById(int id)
        {
            if (id != null)
            {

                CompanyDTO getCompany = await _repository.GetCompanyById(id);
            if (getCompany != null) {

                  return getCompany;

                } else {

                    throw new Exception("La empresa no existe");
                }
            
            }
            else
            {
                throw new Exception("La id es null");
            }

        }

        public async Task<List<CompanyDTO>> GetAllCompanies()
        {
           List<CompanyDTO> listOfCompanies = await _repository.GetAllCompanies();

            if (listOfCompanies != null)
            {
                return listOfCompanies;

            }
            else
            {
                throw new Exception("Error al traer todas las empresas");
            }
        }

        public async Task ModifyCompany(CompanyDTO company)
        {
            if (company != null)
            {
                bool result = await _repository.ModifyCompany(company);
                if (!result)
                {
                    throw new Exception("La Empresa no fue modificada");
                };
            }
            else
            {
                throw new Exception("La Empresa es null");
            }

        }


    }
}
