import { FirebaseError } from "firebase/app";
import { EmailAlreadyExistsError } from "../errors/email-already-exists.error.js";
import { UnauthorizedError } from "../errors/unauthorized.error.js";
import { getAuth } from "firebase-admin/auth";
import { getAuth as getFirebaseAuth, sendPasswordResetEmail, signInAnonymously, signInWithEmailAndPassword } from "firebase/auth";
export class AuthService {
    async create(user) {
        try {
            return await getAuth().createUser({
                email: user.email,
                password: user.password,
                displayName: user.nome,
            });
        }
        catch (err) {
            if (err.code === "auth/email-already-exists") {
                throw new EmailAlreadyExistsError();
            }
            throw err;
        }
    }
    async update(id, user) {
        const props = {
            displayName: user.nome,
            email: user.email,
        };
        if (user.password) {
            props.password = user.password;
        }
        await getAuth().updateUser(id, user);
    }
    async login(email, password) {
        return await signInWithEmailAndPassword(getFirebaseAuth(), email, password).catch((err) => {
            if (err instanceof FirebaseError) {
                if (err.code === "auth/invalid-credential") {
                    throw new UnauthorizedError();
                }
            }
            throw err;
        });
    }
    async delete(id) {
        await getAuth().deleteUser(id);
    }
    async signin() {
        return signInAnonymously(getFirebaseAuth());
    }
    async recovery(email) {
        await sendPasswordResetEmail(getFirebaseAuth(), email);
    }
}
//# sourceMappingURL=auth.service.js.map