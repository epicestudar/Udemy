import { NotFoundError } from "../errors/not-found.error.js";
import { UserRepository } from "../repositories/user.repository.js";
import { AuthService } from "./auth.service.js";
export class UserService {
    userRepository;
    authService;
    constructor() {
        this.userRepository = new UserRepository();
        this.authService = new AuthService();
    }
    async getAll() {
        return this.userRepository.getAll();
    }
    async getById(id) {
        const user = await this.userRepository.getById(id);
        if (!user) {
            throw new NotFoundError("Usuário não encontrado");
        }
        return user;
    }
    async save(user) {
        const userAuth = await this.authService.create(user);
        user.id = userAuth.uid;
        await this.userRepository.update(user);
    }
    async update(id, user) {
        const _user = await this.getById(id);
        _user.nome = user.nome;
        _user.email = user.email;
        await this.authService.update(id, user);
        await this.userRepository.update(_user);
    }
    async delete(id) {
        await this.authService.delete(id);
        await this.userRepository.delete(id);
    }
}
//# sourceMappingURL=user.service.js.map