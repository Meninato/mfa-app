import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { IAuthLoginRequest, IAuthLoginResponse } from "../models/auth.model";
import { AppConfigService } from "./app-config.service";

@Injectable({providedIn: 'root'})
export class AuthService {

  private baseUrl: string;
  private loginUrl: string;

  constructor(
    private http: HttpClient,
    private config: AppConfigService) {
      this.baseUrl = this.config.api.baseUrl;
      this.loginUrl = this.config.api.auth.login;
    }

  login(request: IAuthLoginRequest): Observable<IAuthLoginResponse> {
    return this.http.post<IAuthLoginResponse>(`${this.baseUrl}/${this.loginUrl}`, request);
  }

}