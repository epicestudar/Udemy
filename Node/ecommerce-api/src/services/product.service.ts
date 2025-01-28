import { NotFoundError } from "../errors/not-found.error.js";
import { Product } from "../models/product.model.js";
import { ProductRepository } from "../repositories/product.repository.js";

export class ProductService {
  private productRepository: ProductRepository;

  constructor() {
    this.productRepository = new ProductRepository();
  }

  async getAll(): Promise<Product[]> {
    return this.productRepository.getAll();
  }

  async getById(id: string): Promise<Product> {
    const product = await this.productRepository.getById(id);

    if (!product) {
      throw new NotFoundError("Produto não encontrado");
    }
    return product;
  }

  async save(product: Omit<Product, "id">) {
    return this.productRepository.save(product);
  }

  async update(id: string, product: Product) {
    const _product = await this.getById(id);

    _product.nome = product.nome;
    _product.descricao = product.descricao;
    _product.preco = product.preco;
    _product.imagem = product.imagem;
    _product.categoria = product.categoria;
    _product.ativa = product.ativa;

    await this.productRepository.update(_product);
  }

  // async update(id: string, product: Product) {
  //   const existingProduct = await this.getById(id);
  //   return this.productRepository.update(id, {
  //     ...existingProduct,
  //     ...product,
  //   });
  // }

  async delete(id: string) {
    await this.productRepository.delete(id);
  }
}