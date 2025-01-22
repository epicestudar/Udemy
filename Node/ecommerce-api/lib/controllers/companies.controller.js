import { CompanyService } from "../services/company.service.js";
export class CompaniesController {
    static async getAll(_req, res) {
        res.send(await new CompanyService().getAll());
    }
    static async getById(_req, res) {
        let companyId = _req.params.id;
        res.send(await new CompanyService().getById(companyId));
    }
    static async save(_req, res) {
        await new CompanyService().save(_req.body);
        res.status(201).send({
            message: "Empresa criada com sucesso"
        });
    }
    static async update(_req, res) {
        let companyId = _req.params.id;
        let company = _req.body;
        await new CompanyService().update(companyId, company);
        res.send({
            message: "Empresa atualizada com sucesso!",
        });
    }
}
//# sourceMappingURL=companies.controller.js.map