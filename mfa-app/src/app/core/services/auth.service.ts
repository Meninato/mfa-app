import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { IAuthLoginRequest, IAuthLoginResponse, IAuthSigninWithTokenResponse } from "../models/api/account.model";
import { AppConfigService } from "./app-config.service";

@Injectable({providedIn: 'root'})
export class AuthService {

  private baseUrl: string;
  private loginUrl: string;
  private loginWithTokenUrl: string;

  constructor(
    private http: HttpClient,
    private config: AppConfigService) {
      this.baseUrl = this.config.api.baseUrl;
      this.loginUrl = this.config.api.auth.login;
      this.loginWithTokenUrl = this.config.api.auth.loginWithToken;
    }

  login(request: IAuthLoginRequest): Observable<IAuthLoginResponse> {
    return this.http.post<IAuthLoginResponse>(`${this.baseUrl}/${this.loginUrl}`, request);
  }

  loginWithToken(): Observable<IAuthSigninWithTokenResponse> {
    return this.http.post<IAuthSigninWithTokenResponse>(`${this.baseUrl}/${this.loginWithTokenUrl}`, {});
  }

}