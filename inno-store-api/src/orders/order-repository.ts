import { Injectable } from '@nestjs/common';
import { Order } from '../__generated__/graphql.schema';
import { CosmosService } from '../common/cosmos.service';
import { FeedResponse } from '@azure/cosmos';

@Injectable()
export class OrderRepository {
  private orders: Order[] = [];

  constructor(private cosmosService: CosmosService) {}

  async findAll(): Promise<Order[]> {
    const container = await this.cosmosService.container('orders');
    const response: FeedResponse<Order> = await container.items
      .query({
        query: 'SELECT * from c',
      })
      .fetchAll();
    return response.resources;
  }

  async createOrder(order: Order): Promise<Order> {
    const container = await this.cosmosService.container('orders');
    const response = await container.items.create<Order>(order);
    return order;
  }
}
