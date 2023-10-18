import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, catchError, filter, finalize, of, switchMap, take, throwError } from "rxjs";
import { IApiErrorResponse } from "../models/api/api-error-response.model";
import { AuthService } from "../services/auth.service";
import { IAuthRefreshTokenResponse } from "../models/api/account.model";
import { Store } from "@ngrx/store";
import * as fromAuth from '@app/core/store/auth';

@Injectable({providedIn: 'root'})
export class ErrorInterceptor implements HttpInterceptor{
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor(private authService: AuthService, private store: Store) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      withCredentials: true
    });

    return next.handle(req).pipe(
      catchError((caughtError: HttpErrorResponse) => {

        if( !req.url.includes('accounts/authenticate') && caughtError.status === HttpStatusCode.Unauthorized) {
          return this.handle401Error(req, next);
        } else {
          let errorMessage = this.getErrorMessge(caughtError);
          return throwError(() => errorMessage);
        }
      })
    )
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if(!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((response) => {
          this.store.dispatch(fromAuth.AuthActions.loginSuccess(response, null));
          this.refreshTokenSubject.next(response.jwtToken);
          const reqWithToken = this.addToken(request, response.jwtToken);
          return next.handle(reqWithToken);
        }),
        catchError((caughtError: HttpErrorResponse) => {
          this.store.dispatch(fromAuth.AuthActions.logout());
          let errorMessage = this.getErrorMessge(caughtError);
          return throwError(() => errorMessage);
        }),
        finalize(() => {
          this.isRefreshing = false;
        })
      )
    } else {
      return this.refreshTokenSubject.pipe(
        filter((token) => token !== null),
        take(1),
        switchMap((token) => {
          const reqWithToken = this.addToken(request, token!);
          return next.handle(reqWithToken);
        })
      )
    }
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  private getErrorMessge(caughtError: HttpErrorResponse) {
    let errorMessage = 'Whoops... algo deu errado';

    if(caughtError.status === 0 && caughtError.error instanceof ProgressEvent) {
      errorMessage = 'Não foi possível conectar ao servidor. Tente novamente em alguns minutos.'
    }
    else if(caughtError.error instanceof ErrorEvent) {
      errorMessage = caughtError.error.message;
    } else {
      const apiErrorResponse = caughtError.error as IApiErrorResponse;
      errorMessage = apiErrorResponse.message;
      if(apiErrorResponse.errors) {
        const fieldError = apiErrorResponse.errors[0];
        errorMessage = fieldError.message;
      }
    }

    return errorMessage;
  }

}