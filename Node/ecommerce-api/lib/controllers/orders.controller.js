import { OrderService } from "../services/order.service.js";
export class OrdersController {
    static async save(req, res) {
        const order = req.body;
        await new OrderService().save(order);
        res.status(201).send({
            message: "Pedido criado com sucesso!"
        });
    }
    static async search(req, res) {
        const orders = await new OrderService().search(req.query);
        res.send(orders);
    }
}
//# sourceMappingURL=orders.controller.js.map