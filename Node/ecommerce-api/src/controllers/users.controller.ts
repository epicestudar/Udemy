import { NextFunction, Request, Response } from "express";
import { getFirestore } from "firebase-admin/firestore";
import { ValidationError } from "../errors/validation-error.js";
import { NotFoundError } from "../errors/not-found.error.js";

export class UsersController {
  static async getAll(_req: Request, res: Response, next: NextFunction) {
    const snapshot = await getFirestore().collection("users").get();
    const users = snapshot.docs.map((doc) => {
      return {
        doc: doc.id,
        ...doc.data(),
      };
    });
    res.send(users);
  }

  static async getById(_req: Request, res: Response, next: NextFunction) {
    let userId = _req.params.id;
    const doc = await getFirestore().collection("users").doc(userId).get();

    if (doc.exists) {
      let user = {
        doc: doc.id,
        ...doc.data(),
      };
      res.send(user);
    } else {
      throw new NotFoundError("Usuário não encontrado");
    }
  }

  static async save(_req: Request, res: Response, next: NextFunction) {
    let user = _req.body;
    if (!user.email || user.email?.length === 0) {
      throw new ValidationError("Email obrigatório");
    }
    await getFirestore().collection("users").add(user);
    res.status(201).send({ message: "Usuário criado com sucesso!" });
  }

  static async update(_req: Request, res: Response, next: NextFunction) {
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
    } else {
      throw new NotFoundError("Usuário não encontrado");
    }
  }

  static async delete(_req: Request, res: Response, next: NextFunction) {
    let userId = _req.params.id;
    await getFirestore().collection("users").doc(userId).delete();

    res.status(204).end();
  }
}
