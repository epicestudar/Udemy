import { Joi } from "celebrate";
export class PaymentMethod {
    id;
    descricao;
    ativa;
    constructor(data) {
        this.id = data.id;
        this.descricao = data.descricao;
        this.ativa = data.ativa ?? true;
    }
}
;
export const newPaymentSchema = Joi.object().keys({
    descricao: Joi.string().min(3).required(),
    ativa: Joi.boolean().only().allow(true).default(true),
});
export const updatePaymentSchema = Joi.object().keys({
    descricao: Joi.string().min(3).required(),
    ativa: Joi.boolean().required(),
});
export const paymentMethodConverter = {
    toFirestore: (paymentMethod) => {
        return {
            descricao: paymentMethod.descricao,
            ativa: paymentMethod.ativa,
        };
    },
    fromFirestore: (snapshot) => {
        return new PaymentMethod({
            id: snapshot.id,
            ...snapshot.data()
        });
    }
};
//# sourceMappingURL=payment-method.model.js.map