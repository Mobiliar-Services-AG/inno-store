import { Resolver, Subscription } from '@nestjs/graphql';
import { PubSubService, PubSubTrigger } from '../core/pubsub/pub-sub.service';

@Resolver('Notification')
export class NotificationsResolver {
  constructor(private pubSub: PubSubService) {}

  @Subscription()
  notificationAdded() {
    return this.pubSub.asyncIterator(PubSubTrigger.NOTIFICATION_ADDED);
  }
}
