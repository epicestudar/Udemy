import { NotFoundError } from "../errors/not-found.error.js";
import { CompanyRepository } from "../repositories/company.repository.js";
import { UploadFileService } from "./upload-file.service.js";
import { isStorageUrlValid } from "../utils/validation-utils.js";
export class CompanyService {
    companyRepository;
    uploadFileService;
    constructor() {
        this.companyRepository = new CompanyRepository();
        this.uploadFileService = new UploadFileService("images/companies/");
    }
    async getAll() {
        return this.companyRepository.getAll();
    }
    async getById(id) {
        const company = await this.companyRepository.getById(id);
        if (!company) {
            throw new NotFoundError("Empresa não encontrada");
        }
        return company;
    }
    async save(company) {
        const logomarcaUrl = await this.uploadFileService.upload(company.logomarca);
        company.logomarca = logomarcaUrl;
        await this.companyRepository.save(company);
    }
    async update(id, company) {
        const _company = await this.getById(id);
        if (!isStorageUrlValid(company.logomarca)) {
            _company.logomarca = await this.uploadFileService.upload(company.logomarca);
        }
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
//# sourceMappingURL=company.service.js.map