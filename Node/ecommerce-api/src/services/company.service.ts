import { NotFoundError } from "../errors/not-found.error.js";
import { Company } from "../models/company.model.js";
import { CompanyRepository } from "../repositories/company.repository.js";

export class CompanyService{

    private companyRepository: CompanyRepository;

    constructor() {
        this.companyRepository = new CompanyRepository();
    }



    async getAll(): Promise<Company[]> {
        return this.companyRepository.getAll();
    }

    async getById(id: string): Promise<Company> {
        const company = await this.companyRepository.getById(id);

        if(!company) {
            throw new NotFoundError("Empresa não encontrada");
        }
        return company;
    }

    async save(company: Company) {
        await this.companyRepository.save(company);
    }

    async update(id: string, company: Company) {
       const _company = await this.companyRepository.getById(id);

       if(!_company) {
        throw new NotFoundError("Empresa não encontrada");
       }

        _company.logomarca = company.logomarca;
        _company.cpfCnpj = company.cpfCnpj;
        _company.razaoSocial = company.razaoSocial;
        _company.nomeFantasia = company.nomeFantasia;
        _company.telefone = company.telefone;
        _company.horarioFuncionamento = company.horarioFuncionamento;
        _company.endereco = company.endereco;
        _company.localizacao = company.localizacao;
        _company.taxaEntrega = company.taxaEntrega;
        _company.ativa = company.ativa;

       await this.companyRepository.update(_company);
    }

   
}