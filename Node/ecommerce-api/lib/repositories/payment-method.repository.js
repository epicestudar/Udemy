import { getFirestore } from "firebase-admin/firestore";
import { paymentMethodConverter } from "../models/payment-method.model.js";
export class PaymentMethodRepository {
    collection;
    constructor() {
        this.collection = getFirestore().collection("payment-methods").withConverter(paymentMethodConverter);
    }
    async getAll() {
        const snapshot = await this.collection.get();
        return snapshot.docs.map((doc) => doc.data());
    }
    async getById(id) {
        const doc = await this.collection.doc(id).get();
        return doc.data() ?? null;
    }
    async save(paymentMethod) {
        await this.collection.add(paymentMethod);
    }
    async update(paymentMethod) {
        await this.collection.doc(paymentMethod.id).set(paymentMethod);
    }
    async delete(id) {
        await this.collection.doc(id).delete();
    }
}
//# sourceMappingURL=payment-method.repository.js.map