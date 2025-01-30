import express from "express";
import { userRoutes } from "./users.route.js";
import { authRoutes } from "./auth.route.js";
import { companiesRoutes } from "./companies.route.js";
import { categoryRoutes } from "./categories.route.js";
import { productRoutes } from "./products.route.js";
import { paymentMethodsRoutes } from "./payment-methods.route.js";
import { orderRoutes } from "./orders.route.js";

export const routes = (app: express.Express) => {
  app.use(express.json({limit: "5mb"}));
  app.use(authRoutes);
  app.use(userRoutes);
  app.use(companiesRoutes);
  app.use(categoryRoutes);
  app.use(productRoutes);
  app.use(paymentMethodsRoutes);
  app.use(orderRoutes);
};
