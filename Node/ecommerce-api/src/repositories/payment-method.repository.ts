import { CollectionReference, getFirestore } from "firebase-admin/firestore";
import { PaymentMethod } from "../models/payment-method.model.js";

export class PaymentMethodRepository{
    private collection: CollectionReference;

    constructor() {
        this.collection = getFirestore().collection("payment-methods")
    }

    async getAll(): Promise<PaymentMethod[]> {
        const snapshot = await this.collection.get();
        return snapshot.docs.map((doc) => {
          return {
            doc: doc.id,
            ...doc.data(),
          };
        }) as unknown as PaymentMethod[];
      }

       async getById(id: string): Promise<PaymentMethod | null> {
          const doc = await this.collection.doc(id).get();
      
          if (doc.exists) {
            return {
              id: doc.id,
              ...doc.data(),
            } as PaymentMethod;
          } else {
            return null;
          }
        }
      
        async save(paymentMethod: PaymentMethod) {
          await this.collection.add(paymentMethod);
        }
      
        async update(paymentMethod: PaymentMethod) {
          let docRef = this.collection.doc(paymentMethod.id!);
          await docRef.set({
            descricao: paymentMethod.descricao,
            ativa: paymentMethod.ativa
          });
        }

        async delete(id: string) {
            await this.collection.doc(id).delete();
        }
}