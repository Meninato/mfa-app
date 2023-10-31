import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { 
  IAuthForgotPasswordRequest, 
  IAuthLoginRequest, 
  IAuthLoginResponse, 
  IAuthRefreshTokenResponse, 
  IAuthRegisterRequest, 
  IAuthResetPasswordRequest, 
  IAuthSigninWithTokenResponse, 
  IAuthValidateResetTokenRequest, 
  IAuthVerifyEmailRequest} from "../models/api/account.model";
import { AppConfigService } from "./app-config.service";
import { IApiMessageResponse } from "../models/api/api.model";

@Injectable({providedIn: 'root'})
export class AuthService {

  constructor(
    private http: HttpClient,
    private config: AppConfigService) { }

  login(request: IAuthLoginRequest): Observable<IAuthLoginResponse> {
    return this.http.post<IAuthLoginResponse>(`${this.config.api.baseUrl}/${this.config.api.auth.login}`, request);
  }

  loginWithToken(): Observable<IAuthSigninWithTokenResponse> {
    return this.http.post<IAuthSigninWithTokenResponse>(`${this.config.api.baseUrl}/${this.config.api.auth.loginWithToken}`, {});
  }

  refreshToken(): Observable<IAuthRefreshTokenResponse> {
    return this.http.post<IAuthRefreshTokenResponse>(`${this.config.api.baseUrl}/${this.config.api.auth.refreshToken}`, {});
  }

  revokeToken(): Observable<void> {
    return this.http.post<void>(`${this.config.api.baseUrl}/${this.config.api.auth.revokeToken}`, {});
  }

  forgotPassword(request: IAuthForgotPasswordRequest): Observable<IApiMessageResponse> {
    return this.http.post<IApiMessageResponse>(`${this.config.api.baseUrl}/${this.config.api.auth.forgotPassword}`, request);
  }

  resetPassword(request: IAuthResetPasswordRequest): Observable<IApiMessageResponse> {
    return this.http.post<IApiMessageResponse>(`${this.config.api.baseUrl}/${this.config.api.auth.resetPassword}`, request);
  }

  validateResetToken(request: IAuthValidateResetTokenRequest): Observable<IApiMessageResponse> {
    return this.http.post<IApiMessageResponse>(`${this.config.api.baseUrl}/${this.config.api.auth.validateResetToken}`, request);
  }

  register(request: IAuthRegisterRequest): Observable<IApiMessageResponse> {
    return this.http.post<IApiMessageResponse>(`${this.config.api.baseUrl}/${this.config.api.auth.register}`, request);
  }

  verifyEmail(request: IAuthVerifyEmailRequest): Observable<IApiMessageResponse> {
    return this.http.post<IApiMessageResponse>(`${this.config.api.baseUrl}/${this.config.api.auth.verifyEmail}`, request);
  }

}