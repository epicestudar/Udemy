import { CollectionReference, getFirestore } from "firebase-admin/firestore";
import { Order } from "../models/order-model.js";

export class OrderRepository {
    private collection: CollectionReference;

    constructor() {
        this.collection = getFirestore().collection('orders');
    }

    async save(order: Order) {
        await this.collection.add(order);
    }
}