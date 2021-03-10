import { Inject, Injectable } from '@nestjs/common';
import { Container, CosmosClient } from '@azure/cosmos';
import { APP_CONFIG, AppConfig } from '../app-config/app-config.types';

const defaultDatabase = 'inno-store';

@Injectable()
export class CosmosService {
  private client: CosmosClient;

  constructor(@Inject(APP_CONFIG) private appConfig: AppConfig) {}

  container(containerId: string): Promise<Container> {
    return this.getContainer(defaultDatabase, containerId);
  }

  private async getContainer(
    databaseId: string,
    containerId: string,
  ): Promise<Container> {
    if (!this.client) {
      this.client = new CosmosClient({
        endpoint: this.appConfig.cosmosDb.endpoint,
        key: this.appConfig.cosmosDb.key,
      });
    }
    await this.client.databases.createIfNotExists({
      id: databaseId,
    });
    const database = this.client.database(databaseId);
    await database.containers.createIfNotExists({
      id: containerId,
    });
    return database.container(containerId);
  }
}
