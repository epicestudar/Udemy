import { NextFunction, Request, Response } from "express";
import { ForbiddenError } from "../errors/forbidden.error.js";

export const allowAnonymousUser = (req: Request, res: Response, next: NextFunction) => {
    if(req.user) {
        return next();
    }

    if(req.method === "GET") {
        if(req.url === "/companies" || req.url === "/categories" || req.url === "/products" || req.url === "/payment-methods" || req.url.startsWith("/orders/")) {
            return next();
        }
    } else if(req.method === "POST") {
        if(req.url === "/orders") {
            return next();
        }
    }

    next(new ForbiddenError("Você não tem permissão para acessar esta rota!"));
}