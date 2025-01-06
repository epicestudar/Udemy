import express from "express";
const app = express();
app.use(express.json());
app.get("/", (_req, res) => {
    res.send("Bem vindo ao curso de Node.js");
});
let id = 0;
let usuarios = [];
app.get("/users", (_req, res) => {
    res.send(usuarios);
});
app.get("/users/:id", (_req, res) => {
    let userId = Number(_req.params.id);
    let user = usuarios.find(user => user.id === userId);
    res.send(user);
});
app.post("/users", (_req, res) => {
    let user = _req.body;
    user.id = ++id;
    usuarios.push(user);
    res.send({
        message: "Usuário criado com sucesso!"
    });
});
app.put("/users/:id", (_req, res) => {
    let userId = Number(_req.params.id);
    let userIndex = usuarios.findIndex((user) => user.id === userId);
    // Atualizar o usuário com os dados enviados no corpo da requisição
    const updatedUser = _req.body;
    // Apenas atualizar campos que foram enviados
    usuarios[userIndex] = {
        ...usuarios[userIndex], // Preserva os campos existentes
        ...updatedUser, // Sobrescreve os campos com os valores enviados
    };
    res.send({
        message: "Usuário atualizado com sucesso!",
        user: usuarios[userIndex], // Retorna o usuário atualizado
    });
});
app.delete("/users/:id", (_req, res) => {
    let userId = Number(_req.params.id);
    let userIndex = usuarios.findIndex((user) => user.id === userId);
    // Remover o usuário do array
    usuarios.splice(userIndex, 1);
    res.send({
        message: "Usuário removido com sucesso!"
    });
});
app.listen(3000, () => {
    console.log("Servidor ativo na porta 3000");
});
//# sourceMappingURL=index.js.map