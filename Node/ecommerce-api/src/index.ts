import express, { Request, Response } from "express";

const app = express();

app.get("/", (_req: Request, res: Response) => {
  res.send("Bem vindo ao curso de Node.js");
});

app.get("/users", (_req: Request, res: Response) => {
    let usuarios = [{
        "nome": "Vinícius",
        "idade": 18
    }, {
        "nome": "Derci",
        "idade": 33
    }];

    res.send(usuarios);
});

app.listen(3000, () => {
  console.log("Servidor ativo na porta 3000");
});
