export interface EnvironmentVariables {
  WEB_UI_URL: string;
  COSMOSDB_ENDPOINT: string;
  COSMOSDB_KEY: string;
}

export interface CosmosDbConfig {
  endpoint: string;
  key: string;
}

export interface AppConfig {
  cosmosDb: CosmosDbConfig;
}

export const APP_CONFIG = 'APP_CONFIG';
