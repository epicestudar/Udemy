import { NotFoundError } from "../errors/not-found.error.js";
import { CompanyRepository } from "../repositories/company.repository.js";
import { OrderRepository } from "../repositories/order.repository.js";
import { PaymentMethodRepository } from "../repositories/payment-method.repository.js";
import { ProductRepository } from "../repositories/product.repository.js";
export class OrderService {
    orderRepository;
    companyRepository;
    paymentMethodRepository;
    productReposiitory;
    constructor() {
        this.orderRepository = new OrderRepository();
        this.companyRepository = new CompanyRepository();
        this.paymentMethodRepository = new PaymentMethodRepository();
        this.productReposiitory = new ProductRepository();
    }
    async save(order) {
        const empresa = await this.companyRepository.getById(order.empresa.id);
        if (!empresa) {
            throw new NotFoundError("Empresa com o ID fornecido não foi encontrado");
        }
        order.empresa = empresa;
        const formaPagamento = await this.paymentMethodRepository.getById(order.formaPagamento.id);
        if (!formaPagamento) {
            throw new NotFoundError("Forma de pagamento com o ID fornecido não foi encontrado");
        }
        order.formaPagamento = formaPagamento;
        for (let item of order.items) {
            const produto = await this.productReposiitory.getById(item.produto.id);
            if (!produto) {
                throw new NotFoundError("Produto com o ID fornecido não foi encontrado");
            }
            item.produto = produto;
        }
        await this.orderRepository.save(order);
    }
    async search(query) {
        return this.orderRepository.search(query);
    }
}
//# sourceMappingURL=order.service.js.map