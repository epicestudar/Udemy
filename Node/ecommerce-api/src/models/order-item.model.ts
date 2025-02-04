import { Joi } from "celebrate";
import { Product } from "./product.model.js";
import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot } from "firebase-admin/firestore";

export class OrderItem {
    id: string;
    produto: Product;
    qtde: number;
    observacao: string;

    constructor(data: OrderItem | any) {
        this.id = data.id;
        this.produto = new Product(data.produto);
        this.qtde = data.qtde;
        this.observacao = data.observacao;
    }

    getTotal(): number {
      return this.qtde * this.produto.preco;
    }
};

export const orderItemSchema = {
    produto: Joi.object().keys({
        id: Joi.string().trim().required()
    }).required(),
    qtde: Joi.number().integer().positive().required(),
    observacao: Joi.string().trim().allow(null).default(null)
}

 export const orderItemConverter: FirestoreDataConverter<OrderItem> = {
    toFirestore: (item: OrderItem): DocumentData => {
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
    fromFirestore: (snapshot: QueryDocumentSnapshot): OrderItem => {
      return new OrderItem({
        id: snapshot.id,
        ...snapshot.data()
      });
    }
  }