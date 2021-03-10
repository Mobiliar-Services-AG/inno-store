import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppConfig, EnvironmentVariables } from './app-config.types';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService<EnvironmentVariables>) {}

  appConfig(): AppConfig {
    return {
      cosmosDb: {
        endpoint: this.configService.get('CUSTOMCONNSTR_COSMOSDB_ENDPOINT'),
        key: this.configService.get('CUSTOMCONNSTR_COSMOSDB_KEY'),
      },
    };
  }
}
