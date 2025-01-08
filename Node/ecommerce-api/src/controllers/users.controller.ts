import { Request, Response } from "express";
import { getFirestore } from "firebase-admin/firestore";

type User = {
  id: number,
  nome: string,
  email: string
}
let usuarios: User[] = [];

export class UsersController {
    static async getAll(_req: Request, res: Response) {
        const snapshot = await getFirestore().collection("users").get();
        const users = snapshot.docs.map(doc => {
          return {
            doc: doc.id,
            ...doc.data()
          };
        });
        res.send(users);
    }

    static getById(_req: Request, res: Response) {
      let userId = Number(_req.params.id);
      let user = usuarios.find((user) => user.id === userId);
      res.send(user);
    }

    static async save(_req: Request, res: Response) {
      let user = _req.body;
      await getFirestore().collection("users").add(user);
      res.send({ message: "Usuário criado com sucesso!" });
    }

    static update(_req: Request, res: Response) {
      let userId = Number(_req.params.id);
      let userIndex = usuarios.findIndex((user) => user.id === userId);
    
      const updatedUser = _req.body;
      usuarios[userIndex] = { ...usuarios[userIndex], ...updatedUser };
    
      res.send({
        message: "Usuário atualizado com sucesso!",
        user: usuarios[userIndex],
      });
    }

    static delete(_req: Request, res: Response) {
  let userId = Number(_req.params.id);
  let userIndex = usuarios.findIndex((user) => user.id === userId);
  usuarios.splice(userIndex, 1);

  res.send({ message: "Usuário removido com sucesso!" });
}
}