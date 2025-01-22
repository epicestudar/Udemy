import { Joi } from "celebrate";

export type Company = {
  id?: string;
  logomarca: string;
  cpfCnpj: string;
  razaoSocial: string;
  nomeFantasia: string;
  telefone: string;
  horarioFuncionamento: string;
  endereco: string;
  localizacao: string;
  taxaEntrega: number;
  ativa: boolean;
};

export const newCompanySchema = Joi.object().keys({
  logomarca: Joi.string().allow(null),
  cpfCnpj: Joi.alternatives().try(
    Joi.string().length(11).required(),
    Joi.string().length(14).required()
  ),
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
  logomarca: Joi.string().allow(null),
  cpfCnpj: Joi.alternatives().try(
    Joi.string().length(11).required(),
    Joi.string().length(14).required()
  ),
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
