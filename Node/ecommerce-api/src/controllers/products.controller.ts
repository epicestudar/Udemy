import { Request, Response } from "express";
import { Product } from "../models/product.model.js";
import { ProductService } from "../services/product.service.js";

export class ProductsController {
  static async getAll(_req: Request, res: Response) {
    res.send(await new ProductService().getAll());
  }

  static async getById(_req: Request, res: Response) {
    let productId = _req.params.id;
    res.send(await new ProductService().getById(productId));
  }

  static async save(_req: Request, res: Response) {
    const product = _req.body;
    const newProduct = await new ProductService().save(product);

    res.status(201).send({
      message: "Produto criado com sucesso",
      data: newProduct,
    });
  }

  static async update(_req: Request, res: Response) {
    let productId = _req.params.id;
    let product = _req.body as Product;

    await new ProductService().update(productId, product);
    res.send({
      message: "Produto atualizado com sucesso!",
    });
  }

  static async delete(_req: Request, res: Response) {
    let productId = _req.params.id;
    await new ProductService().delete(productId);
    res.status(204).end();
  }
}
