import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppConfigService } from './app-config.service';
import { AppConfig } from './app-config.types';

@Module({
  imports: [ConfigModule],
  providers: [
    AppConfigService,
    {
      provide: 'APP_CONFIG',
      useFactory: (appConfigService: AppConfigService): AppConfig => {
        return appConfigService.appConfig();
      },
      inject: [AppConfigService],
    },
  ],
  exports: ['APP_CONFIG'],
})
export class AppConfigModule {}
