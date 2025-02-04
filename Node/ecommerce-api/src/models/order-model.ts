import { DocumentData, FieldValue, FirestoreDataConverter, QueryDocumentSnapshot, Timestamp } from "firebase-admin/firestore";
import { Address, orderAddressSchema } from "./address.model.js";
import { Company } from "./company.model.js";
import { Customer, customerSchema } from "./customer.model.js";
import { OrderItem, orderItemSchema } from "./order-item.model.js";
import { PaymentMethod } from "./payment-method.model.js";
import { Joi } from "celebrate";

export class Order {
  id: string;
  empresa: Company;
  cliente: Customer;
  endereco: Address;
  cpfCnpjCupom: string;
  date: Date;
  isEntrega: boolean;
  formaPagamento: PaymentMethod;
  taxaEntrega: number;
  items?: OrderItem[];
  status: OrderStatus;
  observacoes: string;
  subtotal: number;
  total: number;

  constructor(date: any) {
    this.id = date.id;
    this.empresa = new Company(date.empresa);
    this.cliente = date.cliente;
    this.endereco = date.endereco;
    this.cpfCnpjCupom = date.cpfCnpjCupom;
    this.date = date.date instanceof Timestamp ? date.date.toDate() : date.date;
    this.isEntrega = date.isEntrega;
    this.formaPagamento = new PaymentMethod(date.formaPagamento);
    this.taxaEntrega = date.taxaEntrega;
    this.items = date.items?.map((item: any) => new OrderItem(item));
    this.status = date.status ?? OrderStatus.pendente;
    this.observacoes = date.observacoes;
    this.subtotal = date.subtotal;
    this.total = date.total;
  }

  getSubtotal(): number {
    return this.items?.map(item => item.getTotal()).reduce((total, next) => total + next, 0) ?? 0;
  }

  getTotal(): number {
    return this.getSubtotal() + this.taxaEntrega;
  }
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
    endereco: Joi.alternatives().conditional(
        "isEntrega", {
            is: true,
            then: orderAddressSchema.required(),
            otherwise: Joi.object().only().allow(null).default(null)
        }
    ),
    cpfCnpjCupom: Joi.alternatives().try(
        Joi.string().length(11).required(),
        Joi.string().length(14).required()
    ).default(null),
    isEntrega: Joi.boolean().required(),
    formaPagamento: Joi.object().keys({
        id: Joi.string().trim().required()
    }).required(),
    taxaEntrega: Joi.number().min(0).required(),
    items: Joi.array().min(1).items(orderItemSchema).required(),
    status: Joi.string().only().allow(OrderStatus.pendente).default(OrderStatus.pendente),
    observacoes: Joi.string().trim().allow(null).default(null)
});

export type QueryParamsOrder = {
  empresaId?: string;
  dataInicio?: Date;
  dataFim?: Date;
  status?: OrderStatus;
};

export const searchOrderQuerySchema = Joi.object().keys({
    empresaId: Joi.string().trim(),
    dataInicio: Joi.date(),
    dataFim: Joi.date(),
    status: Joi.string().only().allow(...Object.values(OrderStatus))
});

export const orderConverter: FirestoreDataConverter<Order> = {
    toFirestore: (order: Order): DocumentData => {
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
    telefone:order.cliente.telefone
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
      }
    },
    fromFirestore: (snapshot: QueryDocumentSnapshot): Order => {
      return new Order({
        id: snapshot.id,
        ...snapshot.data()
      });
    }
  }