import { Address, orderAddressSchema } from "./address.model.js";
import { Company } from "./company.model.js";
import { Customer, customerSchema } from "./customer.model.js";
import { OrderItem } from "./order-item.model.js";
import { PaymentMethod } from "./payment-method.model.js";
import { Joi } from "celebrate";

export type Order = {
    empresa: Company;
    cliente: Customer;
    endereco: Address;
    cpfCnpjCupom: string;
    date: Date;
    isEntrega: boolean;
    formaPagamento: PaymentMethod;
    taxaEntrega: number;
    items: OrderItem[];
    status: OrderStatus;
};

export enum OrderStatus {
    pendente = 'pendente',
    aprovado = 'aprovado',
    entrega = 'entrega',
    concluido = 'concluido',
    cancelado = 'cancelado',
}

export const newOrderSchema = Joi.object().keys({
    empresa: Joi.object().keys({
        id: Joi.string().trim().required()
    }).required(),
    cliente: customerSchema.required(),
    endereco: orderAddressSchema.required(),
    cpfCnpjCupom: Joi.alternatives().try(
        Joi.string().length(11).required(),
        Joi.string().length(14).required()
    ).default(null),
    isEntrega: Joi.boolean().required(),
    formaPagamento: Joi.object().keys({
        id: Joi.string().trim().required()
    }).required(),
    taxaEntrega: Joi.number().min(0).required(),
    items: Joi.array(),
    status: Joi.string().only().allow(OrderStatus.pendente).default(OrderStatus.pendente)
});