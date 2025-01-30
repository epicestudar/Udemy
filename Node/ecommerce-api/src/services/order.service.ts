import { Order } from "../models/order-model.js";
import { OrderRepository } from "../repositories/order.repository";

export class OrderService {
    private orderRepository: OrderRepository;

    constructor() {
        this.orderRepository = new OrderRepository();
    }

    async save(order: Order) {
        await this.orderRepository.save(order);
    }
}