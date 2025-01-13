import { ValidationError } from "../errors/validation-error.js";
import { InternalServerError } from "../errors/internal-server.error.js";
import { NotFoundError } from "../errors/not-found.error.js";
export const errorHandler = (app) => {
    app.use((error, req, res, next) => {
        if (error instanceof ValidationError) {
            error.send(res);
        }
        else if (error instanceof NotFoundError) {
            error.send(res);
        }
        else {
            new InternalServerError().send(res);
        }
    });
};
//# sourceMappingURL=error-handler.middleware.js.map