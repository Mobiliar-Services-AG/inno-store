import {Injectable} from '@nestjs/common';
import {Order} from '../__generated__/graphql.schema';

@Injectable()
export class OrdersService {
  findAll(): Promise<Order[]> {
    return Promise.resolve([
      {
        id: '1',
        name: 'Order 1',
      },
      {
        id: '2',
        name: 'Order 2',
      }
    ]);
  }
}
