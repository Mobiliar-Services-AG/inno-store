import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CreateOrderInput = {
  id: Scalars['String'];
  name: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createOrder?: Maybe<Order>;
  deleteOrder?: Maybe<Order>;
};

export type MutationCreateOrderArgs = {
  order?: Maybe<CreateOrderInput>;
};

export type MutationDeleteOrderArgs = {
  orderId: Scalars['ID'];
};

export type Notification = {
  __typename?: 'Notification';
  createdAt: Scalars['String'];
  text: Scalars['String'];
};

export type Order = {
  __typename?: 'Order';
  id: Scalars['String'];
  name: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  orders: Array<Order>;
  order?: Maybe<Order>;
};

export type QueryOrderArgs = {
  id: Scalars['ID'];
};

export type Subscription = {
  __typename?: 'Subscription';
  notificationAdded?: Maybe<Notification>;
};

export type GetAllOrdersQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllOrdersQuery = { __typename?: 'Query' } & {
  orders: Array<{ __typename?: 'Order' } & Pick<Order, 'id' | 'name'>>;
};

export type CreateOrderMutationVariables = Exact<{
  order: CreateOrderInput;
}>;

export type CreateOrderMutation = { __typename?: 'Mutation' } & {
  createOrder?: Maybe<{ __typename?: 'Order' } & Pick<Order, 'id' | 'name'>>;
};

export type DeleteOrderMutationVariables = Exact<{
  orderId: Scalars['ID'];
}>;

export type DeleteOrderMutation = { __typename?: 'Mutation' } & {
  deleteOrder?: Maybe<{ __typename?: 'Order' } & Pick<Order, 'id' | 'name'>>;
};

export type OnNotificationSubscriptionVariables = Exact<{
  [key: string]: never;
}>;

export type OnNotificationSubscription = { __typename?: 'Subscription' } & {
  notificationAdded?: Maybe<
    { __typename?: 'Notification' } & Pick<Notification, 'text' | 'createdAt'>
  >;
};

export const GetAllOrdersDocument = gql`
  query GetAllOrders {
    orders {
      id
      name
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class GetAllOrdersGQL extends Apollo.Query<
  GetAllOrdersQuery,
  GetAllOrdersQueryVariables
> {
  document = GetAllOrdersDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const CreateOrderDocument = gql`
  mutation CreateOrder($order: CreateOrderInput!) {
    createOrder(order: $order) {
      id
      name
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class CreateOrderGQL extends Apollo.Mutation<
  CreateOrderMutation,
  CreateOrderMutationVariables
> {
  document = CreateOrderDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const DeleteOrderDocument = gql`
  mutation DeleteOrder($orderId: ID!) {
    deleteOrder(orderId: $orderId) {
      id
      name
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class DeleteOrderGQL extends Apollo.Mutation<
  DeleteOrderMutation,
  DeleteOrderMutationVariables
> {
  document = DeleteOrderDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const OnNotificationDocument = gql`
  subscription OnNotification {
    notificationAdded {
      text
      createdAt
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class OnNotificationGQL extends Apollo.Subscription<
  OnNotificationSubscription,
  OnNotificationSubscriptionVariables
> {
  document = OnNotificationDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
