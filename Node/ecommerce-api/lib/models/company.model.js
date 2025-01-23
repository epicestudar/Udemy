import { Joi } from "celebrate";
export const newCompanySchema = Joi.object().keys({
    logomarca: Joi.string().base64().required(),
    cpfCnpj: Joi.alternatives()
        .try(Joi.string().length(11).required(), Joi.string().length(14).required())
        .required(),
    razaoSocial: Joi.string().required(),
    nomeFantasia: Joi.string().required(),
    telefone: Joi.string()
        .pattern(/^(1[1-9]|[2-9][0-9])\s?(9?[6-9]\d{3}|\d{4})-?\d{4}$/)
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
        .pattern(/^(1[1-9]|[2-9][0-9])\s?(9?[6-9]\d{3}|\d{4})-?\d{4}$/)
        .required(),
    horarioFuncionamento: Joi.string().required(),
    endereco: Joi.string().required(),
    localizacao: Joi.string().required(),
    taxaEntrega: Joi.number().required(),
    ativa: Joi.boolean().required(),
});
//# sourceMappingURL=company.model.js.map