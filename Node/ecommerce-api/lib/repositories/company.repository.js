import { getFirestore } from "firebase-admin/firestore";
export class CompanyRepository {
    collection;
    constructor() {
        this.collection = getFirestore().collection("companies");
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
    async save(company) {
        await this.collection.add(company);
    }
    async update(company) {
        let docRef = this.collection.doc(company.id);
        delete company.id;
        await docRef.set(company);
    }
}
//# sourceMappingURL=company.repository.js.map