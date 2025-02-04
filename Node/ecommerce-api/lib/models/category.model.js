import { Joi } from "celebrate";
export class Category {
    id;
    descricao;
    ativa;
    constructor(data = {}) {
        this.id = data.id;
        this.descricao = data.descricao;
        this.ativa = data.ativa ?? true;
    }
}
;
export const newCategorySchema = Joi.object().keys({
    descricao: Joi.string().required(),
    ativa: Joi.boolean().only().allow(true).default(true),
});
export const updateCategorySchema = Joi.object().keys({
    descricao: Joi.string().required(),
    ativa: Joi.boolean().required(),
});
export const categoryConverter = {
    toFirestore: (category) => {
        return {
            descricao: category.descricao,
            ativa: category.ativa,
        };
    },
    fromFirestore: (snapshot) => {
        return new Category({
            id: snapshot.id,
            ...snapshot.data()
        });
    }
};
//# sourceMappingURL=category.model.js.map