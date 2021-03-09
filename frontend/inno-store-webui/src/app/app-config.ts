import * as localDevAppConfig from '../assets/app-config-local.json';

export interface AppConfig {
  api: string;
}

export function getAppConfigFromProcessEnv(): AppConfig {
  if (process.env.API_URL) {
    const appConfig:AppConfig = {
      api: process.env.API_URL
    }
    console.info(' got appconfig from env variables: ' + JSON.stringify(appConfig))
    return appConfig;
  } else {
    return (localDevAppConfig as any).default;
  }
}
