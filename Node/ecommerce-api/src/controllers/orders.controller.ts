import { Request, Response } from "express";
import { Order } from "../models/order-model.js";
import { OrderService } from "../services/order.service";

export class OrdersController {
    static async save(req: Request, res: Response) {
        const order = req.body as Order;
        await new OrderService().save(order);
        res.status(201).send({
            message: "Pedido criado com sucesso!"
        });
    }
}