import { ValidationError } from "../errors/validation-error.js";
import { InternalServerError } from "../errors/internal-server.error.js";
export const errorHandler = (app) => {
    app.use((error, req, res, next) => {
        if (error instanceof ValidationError) {
            error.send(res);
        }
        else {
            new InternalServerError().send(res);
        }
    });
};
//# sourceMappingURL=error-handler.middleware.js.map