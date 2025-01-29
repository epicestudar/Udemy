import { Request, Response } from "express";
import { PaymentMethod } from "../models/payment-method.model.js";
import { PaymentMethodService } from "../services/payment-method.service.js";

export class PaymentMethodController {
  static async getAll(_req: Request, res: Response) {
    res.send(await new PaymentMethodService().getAll());
  }

  static async getById(_req: Request, res: Response) {
    let paymentMethodId = _req.params.id;
    res.send(await new PaymentMethodService().getById(paymentMethodId));
  }

  static async save(_req: Request, res: Response) {
    await new PaymentMethodService().save(_req.body);
    res.status(201).send({
      message: "Forma de Pagamento criada com sucesso",
    });
  }

  static async update(_req: Request, res: Response) {
    let paymentMethodId = _req.params.id;
    let paymentMethod = _req.body as PaymentMethod;

    await new PaymentMethodService().update(paymentMethodId, paymentMethod);
    res.send({
      message: "Forma de Pagamento atualizada com sucesso!",
    });
  }

  static async delete(_req: Request, res: Response) {
    let paymentMethodId = _req.params.id;
    await new PaymentMethodService().delete(paymentMethodId);
    res.status(204).end();
  }
}
