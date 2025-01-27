import { Request, Response } from "express";
import { Category } from "../models/category.model.js";
import { CategoryService } from "../services/category.service.js";

export class CategoriesController {
  static async getAll(_req: Request, res: Response) {
    res.send(await new CategoryService().getAll());
  }

  static async getById(_req: Request, res: Response) {
    let categoryId = _req.params.id;
    res.send(await new CategoryService().getById(categoryId));
  }

  static async save(_req: Request, res: Response) {
    const category = _req.body;
    const newCategory = await new CategoryService().save(category);

    res.status(201).send({
      message: "Categoria criada com sucesso",
      data: newCategory,
    });
  }

  static async update(_req: Request, res: Response) {
    let categoryId = _req.params.id;
    let category = _req.body as Category;

    await new CategoryService().update(categoryId, category);
    res.send({
      message: "Categoria atualizada com sucesso!",
    });
  }

  static async delete(_req: Request, res: Response) {
    let categoryId = _req.params.id;
    await new CategoryService().delete(categoryId);
    res.status(204).end();
  }
}
