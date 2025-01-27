import { Joi } from "celebrate";
export const newCategorySchema = Joi.object().keys({
    descricao: Joi.string().required(),
    ativa: Joi.boolean().only().allow(true).default(true),
});
export const updateCategorySchema = Joi.object().keys({
    descricao: Joi.string().required(),
    ativa: Joi.boolean().required(),
});
//# sourceMappingURL=category.model.js.map