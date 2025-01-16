import { getFirestore } from "firebase-admin/firestore";
import { NotFoundError } from "../errors/not-found.error.js";
import { UserService } from "../services/user.service.js";
export class UsersController {
    static async getAll(_req, res, next) {
        res.send(await new UserService().getAll());
    }
    static async getById(_req, res, next) {
        let userId = _req.params.id;
        res.send(await new UserService().getById(userId));
    }
    static async save(_req, res, next) {
        let user = _req.body;
        await getFirestore().collection("users").add(user);
        res.status(201).send({ message: "Usuário criado com sucesso!" });
    }
    static async update(_req, res, next) {
        let userId = _req.params.id;
        let user = _req.body;
        let docRef = getFirestore().collection("users").doc(userId);
        if ((await docRef.get()).exists) {
            await docRef.set({
                nome: user.nome,
                email: user.email,
            });
            res.send({
                message: "Usuário atualizado com sucesso!",
            });
        }
        else {
            throw new NotFoundError("Usuário não encontrado");
        }
    }
    static async delete(_req, res, next) {
        let userId = _req.params.id;
        await getFirestore().collection("users").doc(userId).delete();
        res.status(204).end();
    }
}
//# sourceMappingURL=users.controller.js.map