import { Request, Response } from "express";
import { User } from "../models/user.model.js";
import { UserService } from "../services/user.service.js";

export class UsersController {
  static async getAll(_req: Request, res: Response) {
    res.send(await new UserService().getAll());
  }

  static async getById(_req: Request, res: Response) {
    const userId = _req.params.id;
    res.send(await new UserService().getById(userId));
  }

  static async save(_req: Request, res: Response) {    
    await new UserService().save(_req.body);
    res.status(201).send({
      message: "Usuário criado com sucesso"
    })
  }

  static async update(_req: Request, res: Response) {
    const userId = _req.params.id;
    const user = _req.body as User;

    await new UserService().update(userId, user);
     res.send({
       message: "Usuário atualizado com sucesso!",
     });
  }

  static async delete(_req: Request, res: Response) {
    const userId = _req.params.id;
    await new UserService().delete(userId);
    res.status(204).end();
  }
}
