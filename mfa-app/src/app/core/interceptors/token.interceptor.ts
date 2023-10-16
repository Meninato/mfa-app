import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { Observable, mergeMap, take } from "rxjs";
import * as fromAuth from '@app/core/store/auth';
import { LocalStorageService } from "../services/local-storage.service";
import { Injectable } from "@angular/core";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private store: Store, 
    private localStorageService: LocalStorageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.localStorageService.getItem('token');
    if(token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(req);

    // return this.store.select(fromAuth.AuthSelectors.selectAuthToken).pipe(
    //   take(1),
    //   mergeMap(token => {
    //     if(token) {
    //       req = req.clone({
    //         setHeaders: {
    //           Authorization: `Bearer ${token}`
    //         }
    //       });
    //     }
    //     return next.handle(req);
    //   })
    // );
  }
}