import { getFirestore } from "firebase-admin/firestore";
import { orderConverter } from "../models/order-model.js";
import dayjs from "dayjs";
import { orderItemConverter } from "../models/order-item.model.js";
import { NotFoundError } from "../errors/not-found.error.js";
// import { orderItemConverter } from "../models/order-item.model.js";
export class OrderRepository {
    collection;
    constructor() {
        this.collection = getFirestore().collection('orders').withConverter(orderConverter);
    }
    async save(order) {
        // const orderRef = await this.collection.add(order);
        // for(let item of order.items) {
        //     await orderRef.collection("items").withConverter(orderItemConverter).add(item);
        // }
        const batch = getFirestore().batch();
        const orderRef = this.collection.doc();
        batch.create(orderRef, order);
        const itemsRef = orderRef.collection("items").withConverter(orderItemConverter);
        for (let item of order.items) {
            batch.create(itemsRef.doc(), item);
        }
        await batch.commit();
    }
    async search(queryParams) {
        let query = this.collection;
        if (queryParams.empresaId) {
            query = query.where("empresa.id", "==", queryParams.empresaId);
        }
        if (queryParams.dataInicio) {
            queryParams.dataInicio = dayjs(queryParams.dataInicio).add(1, "day").startOf("day").toDate();
            query = query.where("date", ">=", queryParams.dataInicio);
        }
        if (queryParams.dataFim) {
            queryParams.dataFim = dayjs(queryParams.dataFim)
                .add(1, "day")
                .endOf("day")
                .toDate();
            query = query.where("date", "<=", queryParams.dataFim);
        }
        if (queryParams.status) {
            query = query.where("status", "==", queryParams.status);
        }
        const snapshot = await query.get();
        return snapshot.docs.map(doc => doc.data());
    }
    async getItems(pedidoId) {
        const pedidoRef = this.collection.doc(pedidoId);
        const snapshot = await pedidoRef.collection("items").withConverter(orderItemConverter).get();
        return snapshot.docs.map(doc => doc.data());
    }
    async getById(pedidoId) {
        const order = ((await this.collection.doc(pedidoId).get()).data());
        if (!order) {
            throw new NotFoundError("Pedido não encontrado");
        }
        order.items = await this.getItems(pedidoId);
        return order;
    }
    async changeStatus(pedidoId, status) {
        await this.collection.withConverter(null).doc(pedidoId).set({
            status: status
        }, {
            merge: true
        });
    }
}
//# sourceMappingURL=order.repository.js.map