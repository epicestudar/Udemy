import { getFirestore } from "firebase-admin/firestore";
import { userConverter } from "../models/user.model.js";
export class UserRepository {
    collection;
    constructor() {
        this.collection = getFirestore().collection("users").withConverter(userConverter);
    }
    async getAll() {
        const snapshot = await this.collection.get();
        return snapshot.docs.map((doc) => doc.data());
    }
    async getById(id) {
        const doc = await this.collection.doc(id).get();
        return doc.data() ?? null;
    }
    async save(user) {
        await this.collection.add(user);
    }
    async update(user) {
        await this.collection.doc(user.id).set(user);
    }
    async delete(id) {
        await this.collection.doc(id).delete();
    }
}
//# sourceMappingURL=user.repository.js.map