import { getFirestore } from "firebase-admin/firestore";
import { categoryConverter } from "../models/category.model.js";
export class CategoryRepository {
    collection;
    constructor() {
        this.collection = getFirestore().collection("categories").withConverter(categoryConverter);
    }
    async getAll() {
        const snapshot = await this.collection.get();
        return snapshot.docs.map((doc) => doc.data());
    }
    async getById(id) {
        const doc = await this.collection.doc(id).get();
        return doc.data() ?? null;
    }
    async save(category) {
        await this.collection.add(category);
    }
    async update(category) {
        await this.collection.doc(category.id).set(category);
    }
    async delete(id) {
        await this.collection.doc(id).delete();
    }
}
//# sourceMappingURL=category.repository.js.map