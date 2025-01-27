import { getFirestore } from "firebase-admin/firestore";
export class ProductRepository {
    collection;
    constructor() {
        this.collection = getFirestore().collection("products");
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
    async save(product) {
        const docRef = await this.collection.add(product);
        return { id: docRef.id, ...product };
    }
    // async update(product: Product) {
    //   let docRef = this.collection.doc(product.id!);
    //   await docRef.set({
    //     descricao: product.descricao,
    //     ativa: product.ativa,
    //   });
    // }
    async update(id, product) {
        await this.collection.doc(id).set(product, { merge: true });
    }
    async delete(id) {
        await this.collection.doc(id).delete();
    }
}
//# sourceMappingURL=product.repository.js.map