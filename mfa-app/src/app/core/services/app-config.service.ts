import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, lastValueFrom, map } from "rxjs";

export interface IAppConfig {
  api: {
    baseUrl: string;
    auth: {
      login: string;
      loginWithToken: string;
      refreshToken: string;
      revokeToken: string;
      forgotPassword: string;
      resetPassword: string;
      validateResetToken: string;
      register: string;
    }
  };
}

@Injectable({providedIn: 'root'})
export class AppConfigService {
  private appConfig: IAppConfig | null = null;

  constructor(private http: HttpClient) {}

  load() {
    return this.http.get<IAppConfig>('app.config.json').pipe(map((config) => {
      this.appConfig = config;
    }));

    // return await lastValueFrom(this.http.get<IAppConfig>('app.config.json'))
    //   .then((config) => this.appConfig = config);
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