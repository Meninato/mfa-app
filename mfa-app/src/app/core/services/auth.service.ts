import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { IAuthLoginRequest, IAuthLoginResponse } from "../models/auth.model";
import { AppConfigService } from "./app-config.service";

@Injectable({providedIn: 'root'})
export class AuthService {

  constructor(
    private http: HttpClient,
    private config: AppConfigService) {

    }

  login(request: IAuthLoginRequest): Observable<IAuthLoginResponse> {
    return this.http.post<IAuthLoginResponse>(`${this.config.api.baseUrl}/${this.config.api.auth.login}`, request);
  }

}