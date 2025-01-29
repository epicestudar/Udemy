import { NotFoundError } from "../errors/not-found.error.js";
import { PaymentMethodRepository } from "../repositories/payment-method.repository.js";
export class PaymentMethodService {
    paymentMethodRepository;
    constructor() {
        this.paymentMethodRepository = new PaymentMethodRepository();
    }
    async getAll() {
        return this.paymentMethodRepository.getAll();
    }
    async getById(id) {
        const paymentMethod = await this.paymentMethodRepository.getById(id);
        if (!paymentMethod) {
            throw new NotFoundError("Forma de Pagamento não encontrada");
        }
        return paymentMethod;
    }
    async save(paymentMethod) {
        await this.paymentMethodRepository.save(paymentMethod);
    }
    async update(id, paymentMethod) {
        const _paymentMethod = await this.getById(id);
        _paymentMethod.descricao = paymentMethod.descricao;
        _paymentMethod.ativa = paymentMethod.ativa;
        await this.paymentMethodRepository.update(_paymentMethod);
    }
    async delete(id) {
        await this.paymentMethodRepository.delete(id);
    }
}
//# sourceMappingURL=payment-method.service.js.map