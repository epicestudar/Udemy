import { FieldValue, Timestamp } from "firebase-admin/firestore";
import { orderAddressSchema } from "./address.model.js";
import { Company } from "./company.model.js";
import { customerSchema } from "./customer.model.js";
import { OrderItem, orderItemSchema } from "./order-item.model.js";
import { PaymentMethod } from "./payment-method.model.js";
import { Joi } from "celebrate";
export class Order {
    id;
    empresa;
    cliente;
    endereco;
    cpfCnpjCupom;
    date;
    isEntrega;
    formaPagamento;
    taxaEntrega;
    items;
    status;
    observacoes;
    subtotal;
    total;
    constructor(date) {
        this.id = date.id;
        this.empresa = new Company(date.empresa);
        this.cliente = date.cliente;
        this.endereco = date.endereco;
        this.cpfCnpjCupom = date.cpfCnpjCupom;
        this.date = date.date instanceof Timestamp ? date.date.toDate() : date.date;
        this.isEntrega = date.isEntrega;
        this.formaPagamento = new PaymentMethod(date.formaPagamento);
        this.taxaEntrega = date.taxaEntrega;
        this.items = date.items?.map((item) => new OrderItem(item));
        this.status = date.status ?? OrderStatus.pendente;
        this.observacoes = date.observacoes;
        this.subtotal = date.subtotal;
        this.total = date.total;
    }
    getSubtotal() {
        return this.items?.map(item => item.getTotal()).reduce((total, next) => total + next, 0) ?? 0;
    }
    getTotal() {
        return this.getSubtotal() + this.taxaEntrega;
    }
}
;
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
    status: Joi.string().only().allow(OrderStatus.pendente).default(OrderStatus.pendente),
    observacoes: Joi.string().trim().allow(null).default(null)
});
export const changeStatusOrderSchema = Joi.object().keys({
    status: Joi.string().only().allow(OrderStatus.aprovado, OrderStatus.cancelado, OrderStatus.concluido, OrderStatus.entrega).required()
});
export const searchOrderQuerySchema = Joi.object().keys({
    empresaId: Joi.string().trim(),
    dataInicio: Joi.date(),
    dataFim: Joi.date(),
    status: Joi.string().only().allow(...Object.values(OrderStatus))
});
export const orderConverter = {
    toFirestore: (order) => {
        return {
            empresa: {
                id: order.empresa.id,
                logomarca: order.empresa.logomarca,
                cpfCnpj: order.empresa.cpfCnpj,
                razaoSocial: order.empresa.razaoSocial,
                nomeFantasia: order.empresa.nomeFantasia,
                telefone: order.empresa.telefone,
                endereco: order.empresa.endereco,
                localizacao: order.empresa.localizacao
            },
            cliente: {
                nome: order.cliente.nome,
                telefone: order.cliente.telefone
            },
            endereco: {
                cep: order.endereco.cep,
                logradouro: order.endereco.logradouro,
                numero: order.endereco.numero,
                complemento: order.endereco.complemento,
                cidade: order.endereco.cidade,
                uf: order.endereco.uf
            },
            cpfCnpjCupom: order.cpfCnpjCupom,
            date: FieldValue.serverTimestamp(),
            isEntrega: order.isEntrega,
            formaPagamento: {
                id: order.formaPagamento.id,
                descricao: order.formaPagamento.descricao,
                ativa: order.formaPagamento.ativa
            },
            taxaEntrega: order.taxaEntrega,
            status: order.status,
            observacoes: order.observacoes,
            subtotal: order.getSubtotal(),
            total: order.getTotal()
        };
    },
    fromFirestore: (snapshot) => {
        return new Order({
            id: snapshot.id,
            ...snapshot.data()
        });
    }
};
//# sourceMappingURL=order-model.js.map