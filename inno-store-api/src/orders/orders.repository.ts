import { Injectable } from '@nestjs/common';
import { Order } from '../__generated__/graphql.schema';
import { FeedResponse } from '@azure/cosmos';
import { CosmosService } from '../core/db/cosmos.service';

@Injectable()
export class OrdersRepository {
  constructor(private cosmos: CosmosService) {}

  async findAll(): Promise<Order[]> {
    const container = await this.cosmos.container('orders');
    const response: FeedResponse<Order> = await container.items
      .query({
        query: 'SELECT * from c',
      })
      .fetchAll();
    return response.resources;
  }

  async createOrder(order: Order): Promise<Order> {
    const container = await this.cosmos.container('orders');
    await container.items.create<Order>(order);
    return order;
  }
}
