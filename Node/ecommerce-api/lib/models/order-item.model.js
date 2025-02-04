import { Joi } from "celebrate";
import { Product } from "./product.model.js";
export class OrderItem {
    id;
    produto;
    qtde;
    observacao;
    constructor(data) {
        this.id = data.id;
        this.produto = new Product(data.produto);
        this.qtde = data.qtde;
        this.observacao = data.observacao;
    }
    getTotal() {
        return this.qtde * this.produto.preco;
    }
}
;
export const orderItemSchema = {
    produto: Joi.object().keys({
        id: Joi.string().trim().required()
    }).required(),
    qtde: Joi.number().integer().positive().required(),
    observacao: Joi.string().trim().allow(null).default(null)
};
export const orderItemConverter = {
    toFirestore: (item) => {
        return {
            produto: {
                id: item.produto.id,
                nome: item.produto.nome,
                descricao: item.produto.descricao,
                preco: item.produto.preco,
                imagem: item.produto.imagem,
                categoria: {
                    id: item.produto.categoria.id,
                    descricao: item.produto.categoria.descricao,
                },
            },
            qtde: item.qtde,
            observacao: item.observacao,
        };
    },
    fromFirestore: (snapshot) => {
        return new OrderItem({
            id: snapshot.id,
            ...snapshot.data()
        });
    }
};
//# sourceMappingURL=order-item.model.js.map