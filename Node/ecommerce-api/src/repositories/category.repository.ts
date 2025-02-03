import { CollectionReference, getFirestore } from "firebase-admin/firestore";
import { Category, categoryConverter } from "../models/category.model.js";

export class CategoryRepository {
  private collection: CollectionReference<Category>;

  constructor() {
    this.collection = getFirestore().collection("categories").withConverter(categoryConverter);
  }

  async getAll(): Promise<Category[]> {
    const snapshot = await this.collection.get();
    return snapshot.docs.map((doc) => doc.data());
  }

  async getById(id: string): Promise<Category | null> {
    const doc = await this.collection.doc(id).get();

   return doc.data() ?? null;
  }

  async save(category: Category) {
    await this.collection.add(category);
  }

  async update(category: Category) {
    await this.collection.doc(category.id).set(category);
  }

  async delete(id: string) {
    await this.collection.doc(id).delete();
  }
}