import Joi from "joi";

export type Customer = {
    nome: string;
    telefone: string;
}

export const customerSchema = Joi.object().keys({
    nome: Joi.string().trim().min(5).required(),
    telefone: Joi.string().regex(phoneRegexPatterner).required()
});

