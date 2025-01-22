import express from "express";
import { userRoutes } from "./users.route.js";
import { authRoutes } from "./auth.route.js";
import { companiesRoutes } from "./companies.route.js";
export const routes = (app) => {
    app.use(express.json());
    app.use(authRoutes);
    app.use(userRoutes);
    app.use(companiesRoutes);
};
//# sourceMappingURL=index.js.map