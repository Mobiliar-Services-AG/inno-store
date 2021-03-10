import { PubSub } from 'apollo-server-express';
import { Injectable } from '@nestjs/common';

export enum PubSubTrigger {
  NOTIFICATION_ADDED = 'notificationAdded',
}

@Injectable()
export class PubSubService {
  private pubsub = new PubSub();

  publish<T>(triggerName: PubSubTrigger, data: T): Promise<void> {
    const payload = {};
    payload[PubSubTrigger.NOTIFICATION_ADDED] = data;
    return this.pubsub.publish(triggerName, payload);
  }

  asyncIterator<T>(triggerName: PubSubTrigger): AsyncIterator<T> {
    return this.pubsub.asyncIterator(triggerName);
  }
}
