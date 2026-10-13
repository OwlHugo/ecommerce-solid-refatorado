import { IPaymentMethod } from './IPaymentMethod';

export class PaymentMethodRegistry {
  constructor(private methods: Record<string, IPaymentMethod>) {}

  get(name: string): IPaymentMethod | undefined {
    return this.methods[name];
  }
}
