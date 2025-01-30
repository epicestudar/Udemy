import { celebrate, Segments } from "celebrate";
import { Router } from "express";
import { newOrderSchema } from "../models/order-model";
import expressAsyncHandler from "express-async-handler";
import { OrdersController } from "../controllers/orders.controller.js";

export const orderRoutes = Router();

orderRoutes.post("/orders", celebrate({ [Segments.BODY]: newOrderSchema }), expressAsyncHandler(OrdersController.save));