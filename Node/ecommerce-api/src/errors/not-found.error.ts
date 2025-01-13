import { ErrorBase } from "./base.error.js";

export class NotFoundError extends ErrorBase{
    constructor(message: string) {
        super(404, message);
    }
}