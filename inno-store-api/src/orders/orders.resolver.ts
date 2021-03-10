import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { OrderRepository } from './order-repository';
import { OrdersGuard } from './orders.guard';
import { CreateOrderInput, Order } from '../__generated__/graphql.schema';
import { PubSub } from 'apollo-server-express';

const pubSub = new PubSub();

@Resolver('Order')
export class OrdersResolver {
  constructor(private readonly orderRepository: OrderRepository) {}

  @Query('orders')
  @UseGuards(OrdersGuard)
  async getOrders(): Promise<Order[]> {
    return this.orderRepository.findAll();
  }

  @Mutation()
  async createOrder(@Args('order') orderInput: CreateOrderInput) {
    const order = await this.orderRepository.createOrder(orderInput);
    pubSub.publish('orderCreated', { orderCreated: order });
    return order;
  }

  @Subscription()
  orderCreated() {
    return pubSub.asyncIterator('orderCreated');
  }
}
