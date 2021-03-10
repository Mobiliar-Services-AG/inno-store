import { Module } from '@nestjs/common';
import { OrderRepository } from './order-repository';
import { OrdersResolver } from './orders.resolver';
import { AppConfigModule } from '../app-config/app-config.module';
import { CosmosService } from '../db/cosmos.service';

@Module({
  imports: [AppConfigModule],
  providers: [OrderRepository, OrdersResolver, CosmosService],
})
export class OrdersModule {}
