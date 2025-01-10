import { ErrorBase } from "./base.error.js";
export class InternalServerError extends ErrorBase {
    constructor(message = "Erro interno do servidor") {
        super(500, message);
    }
}
//# sourceMappingURL=internal-server.error.js.map