import { Component, OnInit } from '@angular/core';
import {
  CreateOrderGQL,
  GetAllOrdersGQL,
  OnOrderCreatedGQL,
  Order,
} from '../../../__generated__/graphql.types';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  orders: Order[] = [];
  notifications: string[] = [];

  constructor(
    private allOrdersGQL: GetAllOrdersGQL,
    private onOrderCreatedGQL: OnOrderCreatedGQL,
    private createOrderGQL: CreateOrderGQL,
  ) {}

  async ngOnInit(): Promise<void> {
    this.orders = await this.fetchOrders();
    const orderCreatedResult$ = this.onOrderCreatedGQL.subscribe();
    orderCreatedResult$
      .pipe(map((result) => result.data?.orderCreated))
      .subscribe(async (newOrder) => {
        this.notifications.push(`Order ${newOrder?.id} was created in backend`);
        this.orders = await this.fetchOrders();
      });
  }

  async createOrder(): Promise<void> {
    await this.createOrderGQL
      .mutate({
        order: {
          name: `Order ${new Date().getTime()}`,
          id: `${new Date().getTime()}`,
        },
      })
      .toPromise();
  }

  private fetchOrders(): Promise<Order[]> {
    return this.allOrdersGQL
      .fetch(
        {},
        {
          fetchPolicy: 'no-cache',
        },
      )
      .pipe(map((res) => res.data.orders))
      .toPromise();
  }
}
