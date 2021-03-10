/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class CreateOrderInput {
    id: string;
    name: string;
}

export abstract class ISubscription {
    abstract notificationAdded(): Notification | Promise<Notification>;
}

export class Notification {
    createdAt: string;
    text: string;
}

export abstract class IQuery {
    abstract orders(): Order[] | Promise<Order[]>;

    abstract order(id: string): Order | Promise<Order>;
}

export abstract class IMutation {
    abstract createOrder(order?: CreateOrderInput): Order | Promise<Order>;
}

export class Order {
    id: string;
    name: string;
}
