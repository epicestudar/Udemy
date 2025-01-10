import { Request, Response } from "express";
import { getFirestore } from "firebase-admin/firestore";


export class UsersController {
    static async getAll(_req: Request, res: Response) {
        try {
          const snapshot = await getFirestore().collection("users").get();
          const users = snapshot.docs.map((doc) => {
            return {
              doc: doc.id,
              ...doc.data(),
            };
          });
          res.send(users);
        } catch (error) {
          res.status(500).send({
            message: "Erro ao buscar usuários"
          });
        }
    }

    static async getById(_req: Request, res: Response) {
      try {
        let userId = _req.params.id;
        const doc = await getFirestore().collection("users").doc(userId).get();
       
        let user = {
          doc: doc.id,
          ...doc.data(),
        };
        res.send(user);
      } catch (error) {
        res.status(500).send({
          message: "Erro ao buscar usuário"
        });
      }
    }

    static async save(_req: Request, res: Response) {
      try {
        let user = _req.body;
        await getFirestore().collection("users").add(user);
        res.status(201).send({ message: "Usuário criado com sucesso!" });
      } catch (error) {
        res.status(500).send({
          message: "Erro ao criar usuário"
        });
      }
    }

    static update(_req: Request, res: Response) {
      try {
        let userId = _req.params.id;
        let user = _req.body;

        getFirestore().collection("users").doc(userId).set({
          nome: user.nome,
          email: user.email,
        });

        res.send({
          message: "Usuário atualizado com sucesso!",
        });
      } catch (error) {
        res.status(500).send({
          message: "Erro ao atualizar usuário"
        });
      }
    }

    static async delete(_req: Request, res: Response) {
  try {
    let userId = _req.params.id;
    await getFirestore().collection("users").doc(userId).delete();

    res.status(204).end();
  } catch (error) {
    res.status(500).send({
      message: "Erro ao deletar usuário"
    });
  }
}
}