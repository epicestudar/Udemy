import { UnauthorizedError } from "../errors/unauthorized.error.js";
import { getAuth } from "firebase-admin/auth";
import { UserService } from "../services/user.service.js";
import { ForbiddenError } from "../errors/forbidden.error.js";
import { NotFoundError } from "../errors/not-found.error.js";
export const auth = (app) => {
    app.use(async (req, res, next) => {
        if (isRouteUnAuthenticated(req)) {
            return next();
        }
        const token = req.headers.authorization?.split("Bearer ")[1];
        if (token) {
            try {
                const decodeIdToken = await getAuth().verifyIdToken(token, true);
                if (decodeIdToken.firebase.sign_in_provider === "anonymous") {
                    return next();
                }
                req.user = await new UserService().getById(decodeIdToken.uid);
                return next();
            }
            catch (error) {
                if (error instanceof NotFoundError) {
                    return next(new ForbiddenError());
                }
                else {
                    return next(new UnauthorizedError());
                }
            }
        }
        next(new UnauthorizedError());
    });
    const isRouteUnAuthenticated = (req) => {
        if (req.method === "POST") {
            if (req.url.startsWith("/auth/login") ||
                req.url.startsWith("/auth/recovery") ||
                req.url.startsWith("/auth/signin")) {
                return true;
            }
        }
        return false;
    };
};
//# sourceMappingURL=auth.middleware.js.map