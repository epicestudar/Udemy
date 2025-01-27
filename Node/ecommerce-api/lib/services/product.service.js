import { NotFoundError } from "../errors/not-found.error.js";
import { ProductRepository } from "../repositories/product.repository.js";
export class ProductService {
    productRepository;
    constructor() {
        this.productRepository = new ProductRepository();
    }
    async getAll() {
        return this.productRepository.getAll();
    }
    async getById(id) {
        const product = await this.productRepository.getById(id);
        if (!product) {
            throw new NotFoundError("Produto não encontrado");
        }
        return product;
    }
    async save(product) {
        return this.productRepository.save(product);
    }
    // async update(id: string, product: Product) {
    //   const _product = await this.getById(id);
    //   _product.descricao = product.descricao;
    //   _product.ativa = product.ativa;
    //   await this.productRepository.update(_product);
    // }
    async update(id, product) {
        const existingProduct = await this.getById(id);
        return this.productRepository.update(id, {
            ...existingProduct,
            ...product,
        });
    }
    async delete(id) {
        await this.productRepository.delete(id);
    }
}
//# sourceMappingURL=product.service.js.map