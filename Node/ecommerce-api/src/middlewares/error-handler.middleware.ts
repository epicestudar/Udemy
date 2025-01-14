import express, { NextFunction, Request, Response } from "express";
import { ValidationError } from "../errors/validation-error.js";
import { InternalServerError } from "../errors/internal-server.error.js";
import { NotFoundError } from "../errors/not-found.error.js";
import { errors } from "celebrate";

export const errorHandler = (app: express.Express) => {
  app.use(errors());
    app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
      if(error instanceof ValidationError) {
        error.send(res);
      } else if(error instanceof NotFoundError) {
        error.send(res);
      } 
      else{
        new InternalServerError().send(res);
      }
    });
}