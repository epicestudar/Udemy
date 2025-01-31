import { orderAddressSchema } from "./address.model.js";
import { customerSchema } from "./customer.model.js";
import { orderItemSchema } from "./order-item.model.js";
import { Joi } from "celebrate";
export var OrderStatus;
(function (OrderStatus) {
    OrderStatus["pendente"] = "pendente";
    OrderStatus["aprovado"] = "aprovado";
    OrderStatus["entrega"] = "entrega";
    OrderStatus["concluido"] = "concluido";
    OrderStatus["cancelado"] = "cancelado";
})(OrderStatus || (OrderStatus = {}));
export const newOrderSchema = Joi.object().keys({
    empresa: Joi.object().keys({
        id: Joi.string().trim().required()
    }).required(),
    cliente: customerSchema.required(),
    endereco: Joi.alternatives().conditional("isEntrega", {
        is: true,
        then: orderAddressSchema.required(),
        otherwise: Joi.object().only().allow(null).default(null)
    }),
    cpfCnpjCupom: Joi.alternatives().try(Joi.string().length(11).required(), Joi.string().length(14).required()).default(null),
    isEntrega: Joi.boolean().required(),
    formaPagamento: Joi.object().keys({
        id: Joi.string().trim().required()
    }).required(),
    taxaEntrega: Joi.number().min(0).required(),
    items: Joi.array().min(1).items(orderItemSchema).required(),
    status: Joi.string().only().allow(OrderStatus.pendente).default(OrderStatus.pendente)
});
export const searchOrderQuerySchema = Joi.object().keys({
    empresaId: Joi.string().trim(),
    dataInicio: Joi.date(),
    dataFim: Joi.date(),
    status: Joi.string().only().allow(...Object.values(OrderStatus))
});
//# sourceMappingURL=order-model.js.map