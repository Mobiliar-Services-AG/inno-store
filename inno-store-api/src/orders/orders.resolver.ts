import {UseGuards} from '@nestjs/common';
import {Query, Resolver} from '@nestjs/graphql';
import {OrdersService} from './orders.service';
import {OrdersGuard} from './orders.guard';
import {Order} from '../__generated__/graphql.schema';

@Resolver('Order')
export class OrdersResolver {
    constructor(private readonly ordersService: OrdersService) {}

    @Query('orders')
    @UseGuards(OrdersGuard)
    async getOrders(): Promise<Order[]> {
        return this.ordersService.findAll();
    }
}
