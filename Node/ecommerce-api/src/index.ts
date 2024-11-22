import express, { Request, Response } from "express";

const app = express();

app.get("/", (_req: Request, res: Response) => {
  res.send("Bem vindo ao curso de Node.js");
});

app.listen(3000, () => {
  console.log("Servidor ativo na porta 3000");
});
