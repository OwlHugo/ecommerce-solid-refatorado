import { Order } from '../domain/Order';
import { IMailProvider } from '../providers/IMailProvider';

export class NotificationService {
  constructor(private mailProvider: IMailProvider) {}

  async orderConfirmed(order: Order, productNames: string[]) {
    return this.mailProvider.sendMail(
      order.customer,
      `Confirmação do Pedido #${order.id}`,
      `Olá, seu pedido #${order.id} no valor de R$ ${order.total} foi confirmado.`,
      `
        <h1>Pedido Confirmado!</h1>
        <p>Olá, seu pedido <b>#${order.id}</b> foi processado com sucesso.</p>
        <p>Total: <strong>R$ ${order.total}</strong></p>
        <ul>
          ${productNames.map((n) => `<li>${n}</li>`).join('')}
        </ul>
      `,
    );
  }
}
