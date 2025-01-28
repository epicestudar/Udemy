import { getFirestore, } from "firebase-admin/firestore";
export class ProductRepository {
    collection;
    constructor() {
        this.collection = getFirestore().collection("products");
    }
    async getAll() {
        const snapshot = await this.collection.get();
        return this.snapshotToArray(snapshot);
    }
    async search(categoriaId) {
        const snapshot = await this.collection
            .where("categoria.id", "==", categoriaId)
            .get();
        return this.snapshotToArray(snapshot);
    }
    snapshotToArray(snapshot) {
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
    async update(product) {
        let docRef = this.collection.doc(product.id);
        await docRef.set({
            nome: product.nome,
            descricao: product.descricao,
            preco: product.preco,
            imagem: product.imagem,
            categoria: product.categoria,
            ativa: product.ativa,
        });
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