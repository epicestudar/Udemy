import { Response } from "express";


export class ErrorBase extends Error{
    constructor(private status: number, message: string) {
        super(message);
    }

    send(res: Response) {
        res.status(this.status).send({
          message: this.message,
        });
    }
}