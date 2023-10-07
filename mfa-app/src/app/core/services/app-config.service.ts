import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, map } from "rxjs";

export interface IAppConfig {
  api: {
    baseUrl: string;
  };
}

@Injectable()
export class AppConfigService {
  private appConfig: IAppConfig | null = null;

  constructor(private http: HttpClient) {}

  load(): Observable<void>  {
    // const config = this.http.get<IAppConfig>('/mfa-app/src/app.config.json');
    // return lastValueFrom(config).then((config) => {
    //   this.appConfig = config;
    // });
    return this.http.get<IAppConfig>('app.config.json').pipe(map((config) => {
      this.appConfig = config;
    }));
  }

  get api() {
    return this.config.api;
  }

  private get config() {
    if (this.appConfig === null) {
      throw Error('Configuration file was not loaded.');
    }

    return this.appConfig;
  }

}