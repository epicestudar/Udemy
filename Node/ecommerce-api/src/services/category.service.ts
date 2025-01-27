import { NotFoundError } from "../errors/not-found.error.js";
import { Category } from "../models/category.model.js";
import { CategoryRepository } from "../repositories/category.repository.js";

export class CategoryService {
  private categoryRepository: CategoryRepository;

  constructor() {
    this.categoryRepository = new CategoryRepository();
  }

  async getAll(): Promise<Category[]> {
    return this.categoryRepository.getAll();
  }

  async getById(id: string): Promise<Category> {
    const category = await this.categoryRepository.getById(id);

    if (!category) {
      throw new NotFoundError("Categpria não encontrada");
    }
    return category;
  }

  async save(category: Omit<Category, "id">) {
    return this.categoryRepository.save(category);
  }

  async update(id: string, category: Category) {
    const _category = await this.getById(id);

    _category.descricao = category.descricao;
    _category.ativa = category.ativa;

    await this.categoryRepository.update(_category);
  }

  async delete(id: string) {
    await this.categoryRepository.delete(id);
  }
}