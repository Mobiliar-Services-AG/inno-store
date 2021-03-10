export interface EnvironmentVariables {
  WEB_UI_URL: string;
  CUSTOMCONNSTR_COSMOSDB_ENDPOINT: string;
  CUSTOMCONNSTR_COSMOSDB_KEY: string;
}

export interface CosmosDbConfig {
  endpoint: string;
  key: string;
}

export interface AppConfig {
  cosmosDb: CosmosDbConfig;
}

export const APP_CONFIG = 'APP_CONFIG';
