import logger from '../lib/logger';
import { IPaymentMethod } from './IPaymentMethod';

export class CreditCardPayment implements IPaymentMethod {
  async process(amount: number, details: any) {
    logger.info(`Processando cartão final ${details.cardNumber.slice(-4)}`);
    if (details.cvv === '000') throw new Error('Cartão recusado');
  }
}
