import { Component, OnInit } from '@angular/core';
import {
  CreateOrderGQL,
  DeleteOrderGQL,
  GetAllOrdersGQL,
  OnNotificationGQL,
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
    private onNotificationGQL: OnNotificationGQL,
    private createOrderGQL: CreateOrderGQL,
    private deleteOrderGQL: DeleteOrderGQL,
  ) {}

  async ngOnInit(): Promise<void> {
    this.orders = await this.fetchOrders();
    this.onNotificationGQL
      .subscribe()
      .pipe(map((result) => result.data?.notificationAdded))
      .subscribe(async (n) => {
        if (n) {
          this.notifications.push(n.text);
          this.orders = await this.fetchOrders();
        }
      });
  }

  async createOrder(): Promise<void> {
    const id = new Date().getTime();
    await this.createOrderGQL
      .mutate({
        order: {
          name: `Order ${id}`,
          id: `${id}`,
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

  async deleteOrder(orderId: string): Promise<void> {
    await this.deleteOrderGQL
      .mutate({
        orderId,
      })
      .toPromise();
  }
}
