import express from "express";
export const userRoutes = express.Router();
let id = 0;
let usuarios = [];
// Definição das rotas
userRoutes.get("/users", (_req, res) => {
    res.send(usuarios);
});
userRoutes.get("/users/:id", (_req, res) => {
    let userId = Number(_req.params.id);
    let user = usuarios.find((user) => user.id === userId);
    res.send(user);
});
userRoutes.post("/users", (_req, res) => {
    let user = _req.body;
    user.id = ++id;
    usuarios.push(user);
    res.send({ message: "Usuário criado com sucesso!" });
});
userRoutes.put("/users/:id", (_req, res) => {
    let userId = Number(_req.params.id);
    let userIndex = usuarios.findIndex((user) => user.id === userId);
    const updatedUser = _req.body;
    usuarios[userIndex] = { ...usuarios[userIndex], ...updatedUser };
    res.send({
        message: "Usuário atualizado com sucesso!",
        user: usuarios[userIndex],
    });
});
userRoutes.delete("/users/:id", (_req, res) => {
    let userId = Number(_req.params.id);
    let userIndex = usuarios.findIndex((user) => user.id === userId);
    usuarios.splice(userIndex, 1);
    res.send({ message: "Usuário removido com sucesso!" });
});
//# sourceMappingURL=users.route.js.map