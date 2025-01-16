import { NotFoundError } from "../errors/not-found.error.js";
import { User } from "../models/user.model.js";
import { UserRepository } from "../repositories/user.repository.js";

export class UserService{

    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }



    async getAll(): Promise<User[]> {
        return this.userRepository.getAll();
    }

    async getById(id: string): Promise<User> {
        const user = await this.userRepository.getById(id);

        if(!user) {
            throw new NotFoundError("Usuário não encontrado");
        }
        return user;
    }

    async save(user: User) {
        await this.userRepository.save(user);
    }

    async update(id: string, user: User) {
       const _user = await this.userRepository.getById(id);

       if(!_user) {
        throw new NotFoundError("Usuário não encontrado");
       }

       _user.nome = user.nome;
       _user.email = user.email;

       this.userRepository.update(_user);
    }

    async delete(id: string) {
        await this.userRepository.delete(id);
    }
}