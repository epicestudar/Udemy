import { getFirestore } from "firebase-admin/firestore";
export class OrderRepository {
    collection;
    constructor() {
        this.collection = getFirestore().collection('orders');
    }
    async save(order) {
        await this.collection.add(order);
    }
    async search(query) {
        const snapshot = await this.collection.get();
        return snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            };
        });
    }
}
//# sourceMappingURL=order.repository.js.map