import { ErrorBase } from "./base.error.js";

export class EmailAlreadyExistsError extends ErrorBase {
    constructor(message = "O e-mail já está sendo usado por outra pessoa!") {
        super(409, message);
    }
}