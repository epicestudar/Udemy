import { UserService } from "../services/user.service.js";
export class UsersController {
    static async getAll(_req, res) {
        res.send(await new UserService().getAll());
    }
    static async getById(_req, res) {
        let userId = _req.params.id;
        res.send(await new UserService().getById(userId));
    }
    static async save(_req, res) {
        await new UserService().save(_req.body);
        res.status(201).send({
            message: "Usuário criado com sucesso"
        });
    }
    static async update(_req, res) {
        let userId = _req.params.id;
        let user = _req.body;
        await new UserService().update(userId, user);
        res.send({
            message: "Usuário atualizado com sucesso!",
        });
    }
    static async delete(_req, res) {
        let userId = _req.params.id;
        await new UserService().delete(userId);
        res.status(204).end();
    }
}
//# sourceMappingURL=users.controller.js.map