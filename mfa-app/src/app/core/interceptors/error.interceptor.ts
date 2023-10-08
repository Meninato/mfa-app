import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, of, throwError } from "rxjs";
import { IApiErrorResponse } from "../models/api-error-response.model";

@Injectable({providedIn: 'root'})
export class ErrorInterceptor implements HttpInterceptor{

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((caughtError: HttpErrorResponse) => {

        console.log(caughtError);

        let errorMessage = '';

        if(caughtError.error instanceof ErrorEvent) {
         //client side error
          console.log("Client side error");

          errorMessage = caughtError.error.message;
        } else {
          //server side error
          console.log("Server side error");

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