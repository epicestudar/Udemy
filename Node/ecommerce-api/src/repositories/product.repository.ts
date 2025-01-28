import { CollectionReference, getFirestore } from "firebase-admin/firestore";
import { Product } from "../models/product.model.js";

export class ProductRepository {
  private collection: CollectionReference;

  constructor() {
    this.collection = getFirestore().collection("products");
  }

  async getAll(): Promise<Product[]> {
    const snapshot = await this.collection.get();
    return snapshot.docs.map((doc) => {
      return {
        doc: doc.id,
        ...doc.data(),
      };
    }) as unknown as Product[];
  }

  async getById(id: string): Promise<Product | null> {
    const doc = await this.collection.doc(id).get();

    if (doc.exists) {
      return {
        id: doc.id,
        ...doc.data(),
      } as Product;
    } else {
      return null;
    }
  }

  async save(product: Omit<Product, "id">): Promise<Product> {
    const docRef = await this.collection.add(product);
    return { id: docRef.id, ...product };
  }

  async update(product: Product) {
    let docRef = this.collection.doc(product.id!);

    await docRef.set({
      nome: product.nome,
      descricao: product.descricao,
      preco: product.preco,
      imagem: product.imagem,
      categoria: product.categoria,
      ativa: product.ativa
    });
  }

  // async update(id: string, product: Omit<Product, "id">) {
  //   await this.collection.doc(id).set(product, { merge: true });
  // }

  async delete(id: string) {
    await this.collection.doc(id).delete();
  }
}