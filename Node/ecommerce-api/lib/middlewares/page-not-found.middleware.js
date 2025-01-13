import { NotFoundError } from "../errors/not-found.error.js";
export const pageNotFoundHandler = (app) => {
    app.use((req, res, next) => {
        next(new NotFoundError("Página não encontrada"));
    });
};
//# sourceMappingURL=page-not-found.middleware.js.map