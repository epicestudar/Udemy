import { Request, Response } from "express";
import { Order, QueryParamsOrder } from "../models/order-model.js";
import { OrderService } from "../services/order.service.js";

export class OrdersController {
    static async save(req: Request, res: Response) {
        const order = req.body as Order;
        await new OrderService().save(order);
        res.status(201).send({
            message: "Pedido criado com sucesso!"
        });
    }

    static async search(req: Request, res: Response) {
        const orders = await new OrderService().search(req.query as QueryParamsOrder);

        res.send(orders);
    }
}