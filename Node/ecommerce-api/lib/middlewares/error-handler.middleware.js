import { InternalServerError } from "../errors/internal-server.error.js";
import { errors } from "celebrate";
import { ErrorBase } from "../errors/base.error.js";
export const errorHandler = (app) => {
    app.use(errors());
    app.use((error, req, res, next) => {
        console.log(error);
        if (error instanceof ErrorBase) {
            error.send(res);
        }
        else {
            new InternalServerError().send(res);
        }
    });
};
//# sourceMappingURL=error-handler.middleware.js.map