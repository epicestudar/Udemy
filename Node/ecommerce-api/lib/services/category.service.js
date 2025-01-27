import { NotFoundError } from "../errors/not-found.error.js";
import { CategoryRepository } from "../repositories/category.repository.js";
export class CategoryService {
    categoryRepository;
    constructor() {
        this.categoryRepository = new CategoryRepository();
    }
    async getAll() {
        return this.categoryRepository.getAll();
    }
    async getById(id) {
        const category = await this.categoryRepository.getById(id);
        if (!category) {
            throw new NotFoundError("Categpria não encontrada");
        }
        return category;
    }
    async save(category) {
        return this.categoryRepository.save(category);
    }
    async update(id, category) {
        const _category = await this.getById(id);
        _category.descricao = category.descricao;
        _category.ativa = category.ativa;
        await this.categoryRepository.update(_category);
    }
    async delete(id) {
        await this.categoryRepository.delete(id);
    }
}
//# sourceMappingURL=category.service.js.map