import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, map } from "rxjs";

export interface IAppConfig {
  api: {
    baseUrl: string;
    auth: {
      login: string;
    }
  };
}

@Injectable({providedIn: 'root'})
export class AppConfigService {
  private appConfig: IAppConfig | null = null;

  constructor(private http: HttpClient) {}

  load(): Observable<void>  {
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