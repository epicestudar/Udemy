import { getFirestore } from "firebase-admin/firestore";
import { Order } from "../models/order-model.js";
import dayjs from "dayjs";
export class OrderRepository {
    collection;
    constructor() {
        this.collection = getFirestore().collection('orders');
    }
    async save(order) {
        await this.collection.add(order);
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
        return snapshot.docs.map(doc => {
            return new Order({
                id: doc.id,
                ...doc.data(),
            });
        });
    }
}
//# sourceMappingURL=order.repository.js.map