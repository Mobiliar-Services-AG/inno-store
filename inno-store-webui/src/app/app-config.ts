import * as localDevAppConfig from '../assets/app-config-local.json';

export interface AppConfig {
  api: string;
}

export function getAppConfigFromProcessEnv(): AppConfig {
  // @ts-ignore
  const api = process?.env?.API_URL;
  if (api) {
    const appConfig: AppConfig = {
      api,
    };
    console.info(
      ' got appconfig from env variables: ' + JSON.stringify(appConfig),
    );
    return appConfig;
  } else {
    return (localDevAppConfig as any).default;
  }
}
