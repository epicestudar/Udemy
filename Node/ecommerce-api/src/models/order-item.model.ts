import { Product } from "./product.model.js";

export type OrderItem = {
    produto: Product;
    qtde: number;
    observacao: string;
};