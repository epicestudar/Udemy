import { Joi } from "celebrate";
import { phoneRegexPattern } from "../utils/regex-utils.js";
export class Company {
    id;
    logomarca;
    cpfCnpj;
    razaoSocial;
    nomeFantasia;
    telefone;
    horarioFuncionamento;
    endereco;
    localizacao;
    taxaEntrega;
    ativa;
    constructor(data) {
        this.id = data.id;
        this.logomarca = data.logomarca;
        this.cpfCnpj = data.cpfCnpj;
        this.razaoSocial = data.razaoSocial;
        this.nomeFantasia = data.nomeFantasia;
        this.telefone = data.telefone;
        this.horarioFuncionamento = data.horarioFuncionamento;
        this.endereco = data.endereco;
        this.localizacao = data.localizacao;
        this.taxaEntrega = data.taxaEntrega;
        this.ativa = data.ativa ?? true;
    }
}
;
export const newCompanySchema = Joi.object().keys({
    logomarca: Joi.string().base64().required(),
    cpfCnpj: Joi.alternatives()
        .try(Joi.string().length(11).required(), Joi.string().length(14).required())
        .required(),
    razaoSocial: Joi.string().required(),
    nomeFantasia: Joi.string().required(),
    telefone: Joi.string()
        .regex(phoneRegexPattern)
        .required(),
    horarioFuncionamento: Joi.string().required(),
    endereco: Joi.string().required(),
    localizacao: Joi.string().required(),
    taxaEntrega: Joi.number().required(),
    ativa: Joi.boolean().only().allow(true).default(true),
});
export const updateCompanySchema = Joi.object().keys({
    logomarca: Joi.alternatives().try(Joi.string().base64().required(), Joi.string().uri().required()).required(),
    cpfCnpj: Joi.alternatives().try(Joi.string().length(11).required(), Joi.string().length(14).required()),
    razaoSocial: Joi.string().required(),
    nomeFantasia: Joi.string().required(),
    telefone: Joi.string()
        .regex(phoneRegexPattern)
        .required(),
    horarioFuncionamento: Joi.string().required(),
    endereco: Joi.string().required(),
    localizacao: Joi.string().required(),
    taxaEntrega: Joi.number().required(),
    ativa: Joi.boolean().required(),
});
export const companyConverter = {
    toFirestore: (company) => {
        return {
            logomarca: company.logomarca,
            cpfCnpj: company.cpfCnpj,
            razaoSocial: company.razaoSocial,
            nomeFantasia: company.nomeFantasia,
            telefone: company.telefone,
            horarioFuncionamento: company.horarioFuncionamento,
            endereco: company.endereco,
            localizacao: company.localizacao,
            taxaEntrega: company.taxaEntrega,
            ativa: company.ativa ?? true,
        };
    },
    fromFirestore: (snapshot) => {
        return new Company({
            id: snapshot.id,
            ...snapshot.data()
        });
    }
};
//# sourceMappingURL=company.model.js.map