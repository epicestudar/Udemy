let id = 0;
let usuarios = [];
export class UsersController {
    static getAll(_req, res) {
        res.send(usuarios);
    }
    static getById(_req, res) {
        let userId = Number(_req.params.id);
        let user = usuarios.find((user) => user.id === userId);
        res.send(user);
    }
    static save(_req, res) {
        let user = _req.body;
        user.id = ++id;
        usuarios.push(user);
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