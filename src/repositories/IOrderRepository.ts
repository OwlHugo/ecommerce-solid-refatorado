import { Order } from '../domain/Order';

export interface IOrderRepository {
  create(customer: string, items: any[], total: number): Promise<Order>;
}
