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
    static async getById(req, res) {
        res.send(await new OrderService().getById(req.params.id));
    }
    static async changeStatus(req, res) {
        const pedidoId = req.params.id;
        const status = req.body;
        await new OrderService().changeStatus(pedidoId, status);
        res.status(204).end();
    }
}
//# sourceMappingURL=orders.controller.js.map