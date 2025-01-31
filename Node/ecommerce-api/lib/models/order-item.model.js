import { Joi } from "celebrate";
export const orderItemSchema = {
    produto: Joi.object().keys({
        id: Joi.string().trim().required()
    }).required(),
    qtde: Joi.number().integer().positive().required(),
    observacao: Joi.string().trim().allow(null).default(null)
};
//# sourceMappingURL=order-item.model.js.map