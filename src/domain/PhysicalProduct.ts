import { Product } from './IProduct';

export class PhysicalProduct implements Product {
  constructor(public id: number, public name: string, public price: number) {}

  // frete fixo, igual ao codigo original
  calculateFreight(): number {
    return 10;
  }
}
