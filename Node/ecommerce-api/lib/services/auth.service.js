import { getAuth } from "firebase-admin/auth";
export class AuthService {
    create(user) {
        return getAuth().createUser({
            email: user.email,
            password: user.password,
            displayName: user.nome
        });
    }
}
//# sourceMappingURL=auth.service.js.map