import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformServer } from '@angular/common';
import { AppConfig, getAppConfigFromProcessEnv } from './app-config';

@Injectable({
  providedIn: 'root',
})
export class AppConfigService {
  appConfig!: AppConfig;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: string,
  ) {}

  async load(): Promise<AppConfig> {
    if (isPlatformServer(this.platformId)) {
      this.appConfig = getAppConfigFromProcessEnv();
      console.info('requested appconfig 1' + JSON.stringify(this.appConfig));
      return Promise.resolve(this.appConfig);
    } else {
      this.appConfig = await this.http.get<AppConfig>('/config').toPromise();
      console.info(
        'requested appconfig 2' + JSON.stringify(this.appConfig.api),
      );
      return this.appConfig;
    }
  }
}
