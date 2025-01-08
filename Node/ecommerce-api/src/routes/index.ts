import express from "express";
import { userRoutes } from "./users.route.js";

export const routes = (app: express.Express) => {
  app.use(express.json());
  app.use(userRoutes);
};
