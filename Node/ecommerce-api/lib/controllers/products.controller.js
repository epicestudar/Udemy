import { ProductService } from "../services/product.service.js";
export class ProductsController {
    static async getAll(_req, res) {
        res.send(await new ProductService().getAll());
    }
    static async getById(_req, res) {
        let productId = _req.params.id;
        res.send(await new ProductService().getById(productId));
    }
    static async save(_req, res) {
        const product = _req.body;
        const newProduct = await new ProductService().save(product);
        res.status(201).send({
            message: "Produto criado com sucesso",
            data: newProduct,
        });
    }
    static async update(_req, res) {
        let productId = _req.params.id;
        let product = _req.body;
        await new ProductService().update(productId, product);
        res.send({
            message: "Produto atualizado com sucesso!",
        });
    }
    static async delete(_req, res) {
        let productId = _req.params.id;
        await new ProductService().delete(productId);
        res.status(204).end();
    }
}
//# sourceMappingURL=products.controller.js.map