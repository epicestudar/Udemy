import { EmailAlreadyExistsError } from "../errors/email-already-exists.error.js";
import { getAuth } from "firebase-admin/auth";
export class AuthService {
    async create(user) {
        try {
            return await getAuth().createUser({
                email: user.email,
                password: user.password,
                displayName: user.nome
            });
        }
        catch (err) {
            if (err.code === "auth/email-already-exists") {
                throw new EmailAlreadyExistsError();
            }
            throw err;
        }
    }
}
//# sourceMappingURL=auth.service.js.map