import { ErrorBase } from "./base.error.js";
export class NotFoundError extends ErrorBase {
    constructor(message) {
        super(404, message);
    }
}
//# sourceMappingURL=not-found.error.js.map