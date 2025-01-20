import { Router } from "express";
import asyncHandler from "express-async-handler";
import { AuthController } from "../controllers/auth.controller.js";
import { celebrate, Segments } from "celebrate";
import { authLoginSchema } from "../models/user.model.js";
export const authRoutes = Router();
// Definição das rotas
authRoutes.post("/auth/login", celebrate({
    [Segments.BODY]: authLoginSchema
}), asyncHandler(AuthController.login));
//# sourceMappingURL=auth.route.js.map