import {Module} from '@nestjs/common';
import {CoreModule} from '../core/core.module';
import {NotificationsResolver} from './notifications.resolver';

@Module({
  imports: [CoreModule],
  providers: [NotificationsResolver],
})
export class NotificationsModule {}
