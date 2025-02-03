import { getFirestore, } from "firebase-admin/firestore";
import { productConverter } from "../models/product.model.js";
export class ProductRepository {
    collection;
    constructor() {
        this.collection = getFirestore().collection("products").withConverter(productConverter);
    }
    async getAll() {
        const snapshot = await this.collection.get();
        return snapshot.docs.map((doc) => doc.data());
    }
    async search(categoriaId) {
        const snapshot = await this.collection
            .where("categoria.id", "==", categoriaId)
            .get();
        return snapshot.docs.map((doc) => doc.data());
    }
    async getById(id) {
        const doc = await this.collection.doc(id).get();
        return doc.data() ?? null;
    }
    async save(product) {
        await this.collection.add(product);
    }
    async update(product) {
        await this.collection.doc(product.id).set(product);
    }
    async delete(id) {
        await this.collection.doc(id).delete();
    }
    async getCountByCategoria(categoriaId) {
        const countSnapshot = await this.collection.where("categoria.id", "==", categoriaId).count().get();
        return countSnapshot.data().count;
    }
}
//# sourceMappingURL=product.repository.js.map