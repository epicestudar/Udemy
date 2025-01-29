import { PaymentMethodService } from "../services/payment-method.service.js";
export class PaymentMethodController {
    static async getAll(_req, res) {
        res.send(await new PaymentMethodService().getAll());
    }
    static async getById(_req, res) {
        let paymentMethodId = _req.params.id;
        res.send(await new PaymentMethodService().getById(paymentMethodId));
    }
    static async save(_req, res) {
        await new PaymentMethodService().save(_req.body);
        res.status(201).send({
            message: "Forma de Pagamento criada com sucesso",
        });
    }
    static async update(_req, res) {
        let paymentMethodId = _req.params.id;
        let paymentMethod = _req.body;
        await new PaymentMethodService().update(paymentMethodId, paymentMethod);
        res.send({
            message: "Forma de Pagamento atualizada com sucesso!",
        });
    }
    static async delete(_req, res) {
        let paymentMethodId = _req.params.id;
        await new PaymentMethodService().delete(paymentMethodId);
        res.status(204).end();
    }
}
//# sourceMappingURL=payment-methods.controller.js.map