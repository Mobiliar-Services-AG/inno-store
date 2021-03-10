import { Module } from '@nestjs/common';
import { OrderRepository } from './order-repository';
import { OrdersResolver } from './orders.resolver';
import { CosmosService } from '../common/cosmos.service';

@Module({
  providers: [OrderRepository, OrdersResolver, CosmosService],
})
export class OrdersModule {}
