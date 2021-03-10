import { Module } from '@nestjs/common';
import { OrdersResolver } from './orders.resolver';
import { CoreModule } from '../core/core.module';
import { CosmosService } from '../core/db/cosmos.service';
import { OrdersRepository } from './orders.repository';

@Module({
  imports: [CoreModule],
  providers: [OrdersRepository, OrdersResolver, CosmosService],
})
export class OrdersModule {}
