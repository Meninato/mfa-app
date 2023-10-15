import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, of, throwError } from "rxjs";
import { IApiErrorResponse } from "../models/api/api-error-response.model";

@Injectable({providedIn: 'root'})
export class ErrorInterceptor implements HttpInterceptor{

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((caughtError: HttpErrorResponse) => {

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

        return throwError(() => errorMessage);
      })
    )
  }

}