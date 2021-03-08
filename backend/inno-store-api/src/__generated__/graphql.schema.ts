
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class CreateOrderInput {
    name?: string;
}

export abstract class IQuery {
    abstract orders(): Order[] | Promise<Order[]>;

    abstract order(id: string): Order | Promise<Order>;
}

export abstract class IMutation {
    abstract createOrder(createOrderInput?: CreateOrderInput): Order | Promise<Order>;
}

export abstract class ISubscription {
    abstract orderCreated(): Order | Promise<Order>;
}

export class Order {
    id?: string;
    name?: string;
}
