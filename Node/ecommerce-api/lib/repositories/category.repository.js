import { getFirestore } from "firebase-admin/firestore";
export class CategoryRepository {
    collection;
    constructor() {
        this.collection = getFirestore().collection("categories");
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
    async save(category) {
        const docRef = await this.collection.add(category);
        return { id: docRef.id, ...category };
    }
    async update(category) {
        let docRef = this.collection.doc(category.id);
        await docRef.set({
            descricao: category.descricao,
            ativa: category.ativa,
        });
    }
    async delete(id) {
        await this.collection.doc(id).delete();
    }
}
//# sourceMappingURL=category.repository.js.map