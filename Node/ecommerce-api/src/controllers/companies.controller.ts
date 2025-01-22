import { Request, Response } from "express";
import { Company } from "../models/company.model.js";
import { CompanyService } from "../services/company.service.js";

export class CompaniesController {
  static async getAll(_req: Request, res: Response) {
    res.send(await new CompanyService().getAll());
  }

  static async getById(_req: Request, res: Response) {
    let companyId = _req.params.id;
    res.send(await new CompanyService().getById(companyId));
  }

  static async save(_req: Request, res: Response) {    
    await new CompanyService().save(_req.body);
    res.status(201).send({
      message: "Empresa criada com sucesso"
    })
  }

  static async update(_req: Request, res: Response) {
    let companyId = _req.params.id;
    let company = _req.body as Company;

    await new CompanyService().update(companyId, company);
     res.send({
       message: "Empresa atualizada com sucesso!",
     });
  }
}
