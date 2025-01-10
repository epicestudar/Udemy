import { NextFunction, Request, Response } from "express";
import { getFirestore } from "firebase-admin/firestore";
import { ValidationError } from "../errors/validation-error.js";


export class UsersController {
    static async getAll(_req: Request, res: Response, next: NextFunction) {
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
          next(error);
        }
    }

    static async getById(_req: Request, res: Response, next: NextFunction) {
      try {
        let userId = _req.params.id;
        const doc = await getFirestore().collection("users").doc(userId).get();
       
        let user = {
          doc: doc.id,
          ...doc.data(),
        };
        res.send(user);
      } catch (error) {
        next(error);
      }
    }

    static async save(_req: Request, res: Response, next: NextFunction) {
      try {
        let user = _req.body;
        if(!user.email || user.email?.length === 0) {
          throw new ValidationError("Email obrigatório");
        }
        await getFirestore().collection("users").add(user);
        res.status(201).send({ message: "Usuário criado com sucesso!" });
      } catch (error) {
        next(error);
      }
    }

    static update(_req: Request, res: Response, next: NextFunction) {
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
        next(error);
      }
    }

    static async delete(_req: Request, res: Response, next: NextFunction) {
  try {
    let userId = _req.params.id;
    await getFirestore().collection("users").doc(userId).delete();

    res.status(204).end();
  } catch (error) {
    next(error);
  }
}
}