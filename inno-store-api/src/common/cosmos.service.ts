import { Injectable } from '@nestjs/common';
import { Container, CosmosClient } from '@azure/cosmos';

const endpoint = 'https://inno-store-cosmosdb.documents.azure.com:443/';
const key = '';
const defaultDatabase = 'inno-store';

@Injectable()
export class CosmosService {
  private client: CosmosClient;

  container(containerId: string): Promise<Container> {
    return this.getContainer(defaultDatabase, containerId);
  }

  private async getContainer(
    databaseId: string,
    containerId: string,
  ): Promise<Container> {
    if (!this.client) {
      this.client = new CosmosClient({ endpoint, key });
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
