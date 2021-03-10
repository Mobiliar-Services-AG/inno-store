import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppConfigService } from './app-config/app-config.service';
import { AppConfig } from './app-config/app-config.types';
import { PubSubService } from './pubsub/pub-sub.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.dev.local', '.env.dev'],
    }),
  ],
  providers: [
    AppConfigService,
    {
      provide: 'APP_CONFIG',
      useFactory: (appConfigService: AppConfigService): AppConfig => {
        return appConfigService.appConfig();
      },
      inject: [AppConfigService],
    },
    PubSubService,
  ],
  exports: ['APP_CONFIG', PubSubService],
})
export class CoreModule {}
