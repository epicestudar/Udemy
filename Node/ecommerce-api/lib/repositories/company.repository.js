import { getFirestore } from "firebase-admin/firestore";
import { companyConverter } from "../models/company.model.js";
export class CompanyRepository {
    collection;
    constructor() {
        this.collection = getFirestore().collection("companies").withConverter(companyConverter);
    }
    async getAll() {
        const snapshot = await this.collection.get();
        return snapshot.docs.map((doc) => doc.data());
    }
    async getById(id) {
        const doc = await this.collection.doc(id).get();
        return doc.data() ?? null;
    }
    async save(company) {
        await this.collection.add(company);
    }
    async update(company) {
        await this.collection.doc(company.id).set(company);
    }
}
//# sourceMappingURL=company.repository.js.map