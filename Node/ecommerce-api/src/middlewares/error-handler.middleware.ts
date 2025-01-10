import express, { NextFunction, Request, Response } from "express";
import { ValidationError } from "../errors/validation-error.js";
import { InternalServerError } from "../errors/internal-server.error.js";

export const errorHandler = (app: express.Express) => {
    app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
      if(error instanceof ValidationError) {
        error.send(res);
      } else{
        new InternalServerError().send(res);
      }
    });
}