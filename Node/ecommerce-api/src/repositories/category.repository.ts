import { CollectionReference, getFirestore } from "firebase-admin/firestore";
import { Category } from "../models/category.model.js";

export class CategoryRepository {
  private collection: CollectionReference;

  constructor() {
    this.collection = getFirestore().collection("categories");
  }

  async getAll(): Promise<Category[]> {
    const snapshot = await this.collection.get();
    return snapshot.docs.map((doc) => {
      return {
        doc: doc.id,
        ...doc.data(),
      };
    }) as unknown as Category[];
  }

  async getById(id: string): Promise<Category | null> {
    const doc = await this.collection.doc(id).get();

    if (doc.exists) {
      return {
        id: doc.id,
        ...doc.data(),
      } as Category;
    } else {
      return null;
    }
  }

  async save(category: Omit<Category, "id">) {
    const docRef = await this.collection.add(category);
    return { id: docRef.id, ...category };
  }

  async update(category: Category) {
    let docRef = this.collection.doc(category.id!);

    await docRef.set({
      descricao: category.descricao,
      ativa: category.ativa,
    });
  }

  async delete(id: string) {
    await this.collection.doc(id).delete();
  }
}