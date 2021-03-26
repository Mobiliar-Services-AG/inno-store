import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { OrdersGuard } from './orders.guard';
import {
  CreateOrderInput,
  Notification,
  Order,
} from '../__generated__/graphql.schema';
import { OrdersRepository } from './orders.repository';
import { PubSubService, PubSubTrigger } from '../core/pubsub/pub-sub.service';

@Resolver('Order')
export class OrdersResolver {
  constructor(
    private orderRepository: OrdersRepository,
    private pubSub: PubSubService,
  ) {}

  @Query('orders')
  @UseGuards(OrdersGuard)
  async getOrders(): Promise<Order[]> {
    return this.orderRepository.findAll();
  }

  @Mutation()
  async createOrder(
    @Args('order') orderInput: CreateOrderInput,
  ): Promise<Order> {
    const order = await this.orderRepository.createOrder(orderInput);
    this.pubSub.publish<Notification>(PubSubTrigger.NOTIFICATION_ADDED, {
      text: `Order with id ${order.id} inserted in DB`,
      createdAt: `${new Date().getTime()}`,
    });
    return order;
  }

  @Mutation()
  async deleteOrder(@Args('orderId') orderId: string): Promise<Order> {
    const order = await this.orderRepository.deleteOrder(orderId);
    this.pubSub.publish<Notification>(PubSubTrigger.NOTIFICATION_ADDED, {
      text: `Deleted Order with id ${orderId} from DB`,
      createdAt: `${new Date().getTime()}`,
    });
    return order;
  }
}
