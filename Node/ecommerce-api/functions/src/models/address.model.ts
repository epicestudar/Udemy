import { Joi } from "celebrate";

export type Address = {
    cep: string;
    logradouro: string;
    numero: string;
    complemento: string;
    cidade: string;
    uf: string;
};

export const orderAddressSchema = Joi.object().keys({
    cep: Joi.string().allow(null).default(null),
    logradouro: Joi.string().trim().required(),
    numero: Joi.string().trim().required(),
    complemento: Joi.string().trim().required(),
    cidade: Joi.string().trim().required(),
    uf: Joi.string().trim().length(2).uppercase().required()
});