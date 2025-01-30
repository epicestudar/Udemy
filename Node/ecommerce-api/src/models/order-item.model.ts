import { Joi } from "celebrate";
import { Product } from "./product.model.js";

export type OrderItem = {
    produto: Product;
    qtde: number;
    observacao: string;
};

export const orderItemSchema = {
    produto: Joi.object().keys({
        id: Joi.string().trim().required()
    }).required(),
    qtde: Joi.number().integer().positive().required(),
    observacao: Joi.string().trim().allow(null).default(null)
}