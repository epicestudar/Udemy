import express from "express";
import { userRoutes } from "./users.route.js";
export const routes = (app) => {
    app.use(express.json());
    app.use(userRoutes);
};
//# sourceMappingURL=index.js.map