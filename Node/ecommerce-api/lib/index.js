import express from "express";
const app = express();
app.get("/", (_req, res) => {
    res.send("Bem vindo ao curso de Node.js");
});
app.listen(3000, () => {
    console.log("Servidor ativo na porta 3000");
});
//# sourceMappingURL=index.js.map