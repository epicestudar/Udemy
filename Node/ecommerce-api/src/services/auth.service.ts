import { FirebaseError } from "firebase/app";
import { EmailAlreadyExistsError } from "../errors/email-already-exists.error.js";
import { UnauthorizedError } from "../errors/unauthorized.error.js";
import { User } from "../models/user.model.js"
import {getAuth, UserRecord} from "firebase-admin/auth"
import {getAuth as getFirebaseAuth, signInWithEmailAndPassword, UserCredential} from "firebase/auth";


export class AuthService {
    async create(user: User): Promise<UserRecord> {
        try {
            return await getAuth().createUser({
                email: user.email,
                password: user.password,
                displayName: user.nome
            });
        } catch (err) {
            if (err.code === "auth/email-already-exists") {
              throw new EmailAlreadyExistsError();
            }
            throw err;
        }
    }

    async login(email: string, password: string): Promise<UserCredential> {
        return await signInWithEmailAndPassword(getFirebaseAuth(), email, password)
        .catch(err => {
            if(err instanceof FirebaseError){
                if(err.code === "auth/invalid-credential") {
                    throw new UnauthorizedError();
                }
            }
            throw err;
        });
    }
}