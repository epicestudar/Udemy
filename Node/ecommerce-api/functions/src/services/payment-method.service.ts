import { NotFoundError } from "../errors/not-found.error.js";
import { PaymentMethod } from "../models/payment-method.model.js";
import { PaymentMethodRepository } from "../repositories/payment-method.repository.js";

export class PaymentMethodService {
     private paymentMethodRepository: PaymentMethodRepository;
    
        constructor() {
            this.paymentMethodRepository = new PaymentMethodRepository();
        }
    
    
    
        async getAll(): Promise<PaymentMethod[]> {
            return this.paymentMethodRepository.getAll();
        }
    
        async getById(id: string): Promise<PaymentMethod> {
            const paymentMethod = await this.paymentMethodRepository.getById(id);
    
            if(!paymentMethod) {
                throw new NotFoundError("Forma de Pagamento não encontrada");
            }
            return paymentMethod;
        }
    
        async save(paymentMethod: PaymentMethod) {
            await this.paymentMethodRepository.save(paymentMethod);
        }
    
        async update(id: string, paymentMethod: PaymentMethod) {
           const _paymentMethod = await this.getById(id);
    
           _paymentMethod.descricao = paymentMethod.descricao;
           _paymentMethod.ativa = paymentMethod.ativa;
    
           await this.paymentMethodRepository.update(_paymentMethod);
        }
    
        async delete(id: string) {
            await this.paymentMethodRepository.delete(id);
        }
}