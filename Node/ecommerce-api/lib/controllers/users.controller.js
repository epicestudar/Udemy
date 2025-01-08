import { getFirestore } from "firebase-admin/firestore";
let usuarios = [];
export class UsersController {
    static async getAll(_req, res) {
        const snapshot = await getFirestore().collection("users").get();
        const users = snapshot.docs.map(doc => {
            return {
                doc: doc.id,
                ...doc.data()
            };
        });
        res.send(users);
    }
    static getById(_req, res) {
        let userId = Number(_req.params.id);
        let user = usuarios.find((user) => user.id === userId);
        res.send(user);
    }
    static async save(_req, res) {
        let user = _req.body;
        await getFirestore().collection("users").add(user);
        res.send({ message: "Usuário criado com sucesso!" });
    }
    static update(_req, res) {
        let userId = Number(_req.params.id);
        let userIndex = usuarios.findIndex((user) => user.id === userId);
        const updatedUser = _req.body;
        usuarios[userIndex] = { ...usuarios[userIndex], ...updatedUser };
        res.send({
            message: "Usuário atualizado com sucesso!",
            user: usuarios[userIndex],
        });
    }
    static delete(_req, res) {
        let userId = Number(_req.params.id);
        let userIndex = usuarios.findIndex((user) => user.id === userId);
        usuarios.splice(userIndex, 1);
        res.send({ message: "Usuário removido com sucesso!" });
    }
}
//# sourceMappingURL=users.controller.js.map