import logger from '../lib/logger';
import { IPaymentMethod } from './IPaymentMethod';

export class DebitCardPayment implements IPaymentMethod {
  async process(amount: number, details: any) {
    logger.info('Processando débito...');
  }
}
