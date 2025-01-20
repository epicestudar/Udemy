import express from "express";
import { userRoutes } from "./users.route.js";
import { authRoutes } from "./auth.route.js";
export const routes = (app) => {
    app.use(express.json());
    app.use(authRoutes);
    app.use(userRoutes);
};
//# sourceMappingURL=index.js.map