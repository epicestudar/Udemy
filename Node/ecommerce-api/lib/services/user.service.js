import { getFirestore } from "firebase-admin/firestore";
import { NotFoundError } from "../errors/not-found.error.js";
export class UserService {
    async getAll() {
        const snapshot = await getFirestore().collection("users").get();
        return snapshot.docs.map((doc) => {
            return {
                doc: doc.id,
                ...doc.data(),
            };
        });
    }
    async getById(id) {
        const doc = await getFirestore().collection("users").doc(id).get();
        if (doc.exists) {
            return {
                id: doc.id,
                ...doc.data()
            };
        }
        else {
            throw new NotFoundError("Usuário não encontrado");
        }
    }
}
//# sourceMappingURL=user.service.js.map