import logger from '../lib/logger';
import { ValidationError } from '../domain/errors';
import { OrderItem } from '../domain/Order';
import { ProductFactory } from '../domain/ProductFactory';
import { IOrderRepository } from '../repositories/IOrderRepository';
import { IProductRepository } from '../repositories/IProductRepository';
import { PaymentMethodRegistry } from '../payments/PaymentMethodRegistry';
import { NotificationService } from './NotificationService';

export class OrderService {
  constructor(
    private products: IProductRepository,
    private orders: IOrderRepository,
    private payments: PaymentMethodRegistry,
    private notification: NotificationService,
  ) {}

  async placeOrder(customer: string, items: OrderItem[], paymentMethod: string, paymentDetails: any) {
    if (!items || items.length === 0) {
      logger.error('Tentativa de pedido sem itens');
      throw new ValidationError('Carrinho vazio');
    }

    let total = 0;
    const details = [];
    for (const item of items) {
      const data = await this.products.findById(item.productId);
      if (!data) throw new ValidationError(`Produto ${item.productId} não encontrado`);

      const product = ProductFactory.createProduct(data);
      total += product.price * item.quantity + product.calculateFreight();
      details.push({ ...data, quantity: item.quantity });
    }

    const payment = this.payments.get(paymentMethod);
    if (!payment) throw new ValidationError('Método de pagamento não suportado');
    await payment.process(total, paymentDetails);

    const order = await this.orders.create(customer, details, total);

    const preview = await this.notification.orderConfirmed(order, details.map((p) => p.name));
    logger.info(`Email enviado: ${preview}`);

    return { orderId: order.id, emailPreview: preview };
  }
}
