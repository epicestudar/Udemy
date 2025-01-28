import { NotFoundError } from "../errors/not-found.error.js";
import { CategoryRepository } from "../repositories/category.repository.js";
import { ProductRepository } from "../repositories/product.repository.js";
import { isStorageUrlValid } from "../utils/validation-utils.js";
import { UploadFileService } from "./upload-file.service.js";
export class ProductService {
    productRepository;
    categoryRepository;
    uploadFileService;
    constructor() {
        this.productRepository = new ProductRepository();
        this.categoryRepository = new CategoryRepository();
        this.uploadFileService = new UploadFileService("images/products/");
    }
    async getAll() {
        return this.productRepository.getAll();
    }
    async search(categoriaId) {
        return this.productRepository.search(categoriaId);
    }
    async getById(id) {
        const product = await this.productRepository.getById(id);
        if (!product) {
            throw new NotFoundError("Produto não encontrado");
        }
        return product;
    }
    async save(product) {
        if (!product.categoria?.id) {
            throw new NotFoundError("O ID da categoria não foi encontrado.");
        }
        const categoria = await this.getCategoriaById(product.categoria.id);
        product.categoria = categoria;
        if (product.imagem) {
            product.imagem = await this.uploadFileService.upload(product.imagem);
        }
        await this.productRepository.save(product);
    }
    async update(id, product) {
        const _product = await this.getById(id);
        if (!product.categoria?.id) {
            throw new NotFoundError("O ID da categoria não foi encontrado.");
        }
        const categoria = await this.getCategoriaById(product.categoria.id);
        product.categoria = categoria;
        if (product.imagem && !isStorageUrlValid(product.imagem)) {
            product.imagem = await this.uploadFileService.upload(product.imagem);
        }
        _product.nome = product.nome;
        _product.descricao = product.descricao;
        _product.preco = product.preco;
        _product.imagem = product.imagem;
        _product.categoria = product.categoria;
        _product.ativa = product.ativa;
        await this.productRepository.update(_product);
    }
    async getCategoriaById(id) {
        const categoria = await this.categoryRepository.getById(id);
        if (!categoria) {
            throw new NotFoundError("Categoria não encontrada");
        }
        return categoria;
    }
    async delete(id) {
        await this.productRepository.delete(id);
    }
}
//# sourceMappingURL=product.service.js.map