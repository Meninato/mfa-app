import { Injectable } from "@angular/core";
import { AuthService } from "@app/core/services/auth.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as fromAuth from '@app/core/store/auth';
import * as fromApp from '@app/core/store';
import { catchError, exhaustMap, map, of, switchMap, tap } from "rxjs";
import { Router } from "@angular/router";
import { LocalStorageService } from "@app/core/services/local-storage.service";

@Injectable()
export class AuthEffects {

  login$ = createEffect(() => 
    this.actions$.pipe(
      ofType(fromAuth.AuthActions.login),
      exhaustMap((action) => 
        this.authService.login(action.request).pipe(
          map((response) => fromAuth.AuthActions.loginSuccess({response}))
        ).pipe(
          catchError((err) => {
            return of(fromAuth.AuthActions.loginFailure({error: err}))
          })
        )
      )
    )
  );

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuth.AuthActions.loginSuccess),
      tap(({response}) => {
        this.localStorageService.setItem('token', response.jwtToken);
        this.router.navigate(['/']);
      })
    ), { dispatch: false }
  );

  loginFailure$ = createEffect(() => 
    this.actions$.pipe(
      ofType(fromAuth.AuthActions.loginFailure),
      switchMap(({error}) => {
        return of(fromApp.AppActions.showAlert({options: {message: error}}));
      })
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuth.AuthActions.logout),
      tap(() => {
        this.localStorageService.removeItem('token');
        this.router.navigate(['/']);
      })
    ), { dispatch: false }
  );

  constructor(
    private actions$: Actions, 
    private authService: AuthService, 
    private router: Router,
    private localStorageService: LocalStorageService) {}
}