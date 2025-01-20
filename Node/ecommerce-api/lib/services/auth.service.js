import { FirebaseError } from "firebase/app";
import { EmailAlreadyExistsError } from "../errors/email-already-exists.error.js";
import { UnauthorizedError } from "../errors/unauthorized.error.js";
import { getAuth } from "firebase-admin/auth";
import { getAuth as getFirebaseAuth, signInWithEmailAndPassword } from "firebase/auth";
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
    async login(email, password) {
        return await signInWithEmailAndPassword(getFirebaseAuth(), email, password)
            .catch(err => {
            if (err instanceof FirebaseError) {
                if (err.code === "auth/invalid-credential") {
                    throw new UnauthorizedError();
                }
            }
            throw err;
        });
    }
}
//# sourceMappingURL=auth.service.js.map