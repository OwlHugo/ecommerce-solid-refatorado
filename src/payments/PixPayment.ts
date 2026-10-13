import logger from '../lib/logger';
import { IPaymentMethod } from './IPaymentMethod';

// metodo novo, entrou sem mexer no OrderService
export class PixPayment implements IPaymentMethod {
  async process(amount: number, details: any) {
    logger.info(`Gerando Pix de R$ ${amount}`);
  }
}
