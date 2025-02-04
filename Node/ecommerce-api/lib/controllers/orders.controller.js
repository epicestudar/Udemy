import { Order } from "../models/order-model.js";
import { OrderService } from "../services/order.service.js";
export class OrdersController {
    static async save(req, res) {
        const order = new Order(req.body);
        await new OrderService().save(order);
        res.status(201).send({
            message: "Pedido criado com sucesso!"
        });
    }
    static async search(req, res) {
        const orders = await new OrderService().search(req.query);
        res.send(orders);
    }
    static async getItems(req, res) {
        const items = await new OrderService().getItems(req.params.id);
        res.send(items);
    }
}
//# sourceMappingURL=orders.controller.js.map