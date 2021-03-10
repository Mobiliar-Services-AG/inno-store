import { Injectable } from '@nestjs/common';
import { Order } from '../__generated__/graphql.schema';

@Injectable()
export class OrdersService {
  private orders: Order[] = [];

  findAll(): Promise<Order[]> {
    return Promise.resolve(this.orders);
  }

  createOrder(order: Order): Promise<Order> {
    this.orders.push(order);
    return Promise.resolve(order);
  }
}
