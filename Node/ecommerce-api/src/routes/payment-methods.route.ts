import {Router} from "express";
import { PaymentMethodController } from "../controllers/payment-methods.controller.js";
import asyncHandler from "express-async-handler";
import { celebrate, Segments } from "celebrate";
import { newPaymentSchema, updatePaymentSchema } from "../models/payment-method.model.js";

export const paymentMethodsRoutes = Router();

// Definição das rotas
paymentMethodsRoutes.get("/payment-methods", asyncHandler(PaymentMethodController.getAll));


paymentMethodsRoutes.get("/payment-methods/:id", asyncHandler(PaymentMethodController.getById));

paymentMethodsRoutes.post(
  "/payment-methods",
  celebrate({
    [Segments.BODY]: newPaymentSchema,
  }),
  asyncHandler(PaymentMethodController.save)
);

paymentMethodsRoutes.put(
  "/payment-methods/:id",
  celebrate({
    [Segments.BODY]: updatePaymentSchema,
  }),
  asyncHandler(PaymentMethodController.update)
);

paymentMethodsRoutes.delete("/payment-methods/:id", asyncHandler(PaymentMethodController.delete));
