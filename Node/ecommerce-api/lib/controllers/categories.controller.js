import { CategoryService } from "../services/category.service.js";
export class CategoriesController {
    static async getAll(_req, res) {
        res.send(await new CategoryService().getAll());
    }
    static async getById(_req, res) {
        let categoryId = _req.params.id;
        res.send(await new CategoryService().getById(categoryId));
    }
    static async save(_req, res) {
        const category = _req.body;
        const newCategory = await new CategoryService().save(category);
        res.status(201).send({
            message: "Categoria criada com sucesso",
            data: newCategory,
        });
    }
    static async update(_req, res) {
        let categoryId = _req.params.id;
        let category = _req.body;
        await new CategoryService().update(categoryId, category);
        res.send({
            message: "Categoria atualizada com sucesso!",
        });
    }
    static async delete(_req, res) {
        let categoryId = _req.params.id;
        await new CategoryService().delete(categoryId);
        res.status(204).end();
    }
}
//# sourceMappingURL=categories.controller.js.map