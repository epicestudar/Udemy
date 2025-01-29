import { getFirestore } from "firebase-admin/firestore";
export class PaymentMethodRepository {
    collection;
    constructor() {
        this.collection = getFirestore().collection("payment-methods");
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
    async save(paymentMethod) {
        await this.collection.add(paymentMethod);
    }
    async update(paymentMethod) {
        let docRef = this.collection.doc(paymentMethod.id);
        await docRef.set({
            descricao: paymentMethod.descricao,
            ativa: paymentMethod.ativa
        });
    }
    async delete(id) {
        await this.collection.doc(id).delete();
    }
}
//# sourceMappingURL=payment-method.repository.js.map