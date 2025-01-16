import { getFirestore } from "firebase-admin/firestore";
export class UserRepository {
    collection;
    constructor() {
        this.collection = getFirestore().collection("users");
    }
    async getAll() {
        const snapshot = await this.collection.get();
        return snapshot.docs.map((doc) => {
            return {
                doc: doc.id,
                ...doc.data(),
            };
        });
    }
    async getById(id) {
        const doc = await this.collection.doc(id).get();
        if (doc.exists) {
            return {
                id: doc.id,
                ...doc.data(),
            };
        }
        else {
            return null;
        }
    }
    async save(user) {
        delete user.password;
        await this.collection.add(user);
    }
    async update(user) {
        let docRef = this.collection.doc(user.id);
        await docRef.set({
            nome: user.nome,
            email: user.email
        });
    }
    async delete(id) {
        await this.collection.doc(id).delete();
    }
}
//# sourceMappingURL=user.repository.js.map