import { Injectable } from "@angular/core";
import { AuthService } from "@app/core/services/auth.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as fromAuth from '@app/core/store/auth';
import * as fromApp from '@app/core/store';
import { EMPTY, catchError, exhaustMap, finalize, map, of, switchMap, tap } from "rxjs";
import { Router } from "@angular/router";
import { LocalStorageService } from "@app/core/services/local-storage.service";

@Injectable()
export class AuthEffects {

  login$ = createEffect(() => 
    this.actions$.pipe(
      ofType(fromAuth.AuthActions.login),
      exhaustMap((action) => 
        this.authService.login(action.request).pipe(
          map((response) => fromAuth.AuthActions.loginSuccess(response)),
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
      tap(({response, redirectTo}) => {
        this.localStorageService.setItem('token', response.jwtToken);
        if(redirectTo) {
          this.router.navigate([redirectTo]);
        }
      })
    ), { dispatch: false }
  );

  loginFailure$ = createEffect(() => 
    this.actions$.pipe(
      ofType(fromAuth.AuthActions.loginFailure),
      switchMap(({error}) => {
        return of(fromApp.AppActions.showAlert({options: {message: error, alertType: 'error'}}));
      })
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuth.AuthActions.logout),
      exhaustMap(() => 
        this.authService.revokeToken().pipe(
          finalize(() => {
            this.localStorageService.removeItem('token');
            this.router.navigate(['/']);
          }),
          catchError(() => {
            return EMPTY;
          })
        )
      ),
    ), { dispatch: false }
  );

  recoverPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuth.AuthActions.recoverPassword),
      exhaustMap((payload) => 
        this.authService.forgotPassword(payload.request).pipe(
          map(({message}) => fromAuth.AuthActions.recoverPasswordSuccess({text: message})),
          catchError((err) => of(fromAuth.AuthActions.recoverPasswordFailure({error: err})))
        )
      )
    )
  );

  recoverPasswordSuccess$ = createEffect(() => 
    this.actions$.pipe(
      ofType(fromAuth.AuthActions.recoverPasswordSuccess),
      switchMap(({text}) => {
        return of(fromApp.AppActions.showAlert({options: {message: text, alertType: 'info'}}));
      })
    )
  );

  recoverPasswordFailure$ = createEffect(() => 
    this.actions$.pipe(
      ofType(fromAuth.AuthActions.recoverPasswordFailure),
      switchMap(({error}) => {
        return of(fromApp.AppActions.showAlert({options: {message: error, alertType: 'error'}}));
      })
    )
  );

  resetPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuth.AuthActions.resetPassword),
      exhaustMap((payload) => 
        this.authService.resetPassword(payload.request).pipe(
          map(({message}) => fromAuth.AuthActions.resetPasswordSuccess({text: message})),
          catchError((err) => of(fromAuth.AuthActions.resetPasswordFailure({error: err})))
        )
      )
    )
  );

  resetPasswordSuccess$ = createEffect(() => 
  this.actions$.pipe(
    ofType(fromAuth.AuthActions.resetPasswordSuccess),
    switchMap(({text}) => {
      this.router.navigate(['/']);
      return of(fromApp.AppActions.showAlert({options: {message: text, alertType: 'info'}}));
    })
  )
);

resetPasswordFailure$ = createEffect(() => 
  this.actions$.pipe(
    ofType(fromAuth.AuthActions.resetPasswordFailure),
    switchMap(({error}) => {
      this.router.navigate(['/']);
      return of(fromApp.AppActions.showAlert({options: {message: error, alertType: 'error'}}));
    })
  )
);

  constructor(
    private actions$: Actions, 
    private authService: AuthService, 
    private router: Router,
    private localStorageService: LocalStorageService) {}
}