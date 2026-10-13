import { PrismaClient } from '@prisma/client';
import { IOrderRepository } from './IOrderRepository';

export class PrismaOrderRepository implements IOrderRepository {
  constructor(private prisma: PrismaClient) {}

  create(customer: string, items: any[], total: number) {
    return this.prisma.order.create({
      data: { customer, items: JSON.stringify(items), total, status: 'confirmed' },
    });
  }
}
