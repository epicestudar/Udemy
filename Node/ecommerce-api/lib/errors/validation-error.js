import { ErrorBase } from "./base.error.js";
export class ValidationError extends ErrorBase {
    constructor(message) {
        super(400, message);
    }
}
//# sourceMappingURL=validation-error.js.map