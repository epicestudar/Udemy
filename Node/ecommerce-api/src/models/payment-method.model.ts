import { Joi } from "celebrate";

export type PaymentMethod = {
  id: string;
  descricao: string;
  ativa: boolean;
};

export const newPaymentSchema = Joi.object().keys({
  descricao: Joi.string().min(3).required(),
  ativa: Joi.boolean().only().allow(true).default(true),
});

export const updatePaymentSchema = Joi.object().keys({
  descricao: Joi.string().min(3).required(),
  ativa: Joi.boolean().required(),
});
