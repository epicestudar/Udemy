import { Joi } from "celebrate";
import { Category } from "./category.model.js";
export class Product {
    id;
    nome;
    descricao;
    preco;
    imagem;
    categoria;
    ativa;
    constructor(data) {
        this.id = data.id;
        this.nome = data.nome;
        this.descricao = data.descricao;
        this.preco = data.preco;
        this.imagem = data.imagem;
        this.categoria = new Category(data.categoria);
        this.ativa = data.ativa ?? true;
    }
}
;
export const newProductSchema = Joi.object().keys({
    nome: Joi.string().min(3).required(),
    descricao: Joi.string().allow(null, "").default(null),
    preco: Joi.number().positive().required(),
    imagem: Joi.string().base64().allow(null).default(null),
    categoria: Joi.object()
        .keys({
        id: Joi.string().required(),
    })
        .required(),
    ativa: Joi.boolean().only().allow(true).default(true),
});
export const updateProductSchema = Joi.object().keys({
    nome: Joi.string().min(3).required(),
    descricao: Joi.string().allow(null, "").default(null),
    preco: Joi.number().positive().required(),
    imagem: Joi.alternatives()
        .try(Joi.string().base64(), Joi.string().uri())
        .allow(null).default(null),
    categoria: Joi.object()
        .keys({
        id: Joi.string().required(),
    })
        .required(),
    ativa: Joi.boolean().required(),
});
export const searchQuerySchema = Joi.object().keys({
    categoriaId: Joi.string().required()
});
export const productMethodConverter = {
    toFirestore: (product) => {
        return {
            nome: product.nome,
            descricao: product.descricao,
            preco: product.preco,
            imagem: product.imagem,
            categoria: {
                id: product.categoria.id,
                descricao: product.categoria.descricao,
                ativa: product.categoria.ativa
            },
            ativa: product.ativa,
        };
    },
    fromFirestore: (snapshot) => {
        return new Product({
            id: snapshot.id,
            ...snapshot.data()
        });
    }
};
//# sourceMappingURL=product.model.js.map