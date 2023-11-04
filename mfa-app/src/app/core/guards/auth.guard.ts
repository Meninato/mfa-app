import { inject } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { catchError, map, of} from "rxjs";
import * as fromAuth from '@app/core/store/auth';
import * as fromApp from '@app/core/store';
import { AuthService } from "../services/auth.service";

export const isValidVerifyEmailToken = (routeSnapshot: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  let canContinue = true;
  const token = routeSnapshot.queryParamMap.get('token');
  if(!token) {
    canContinue = false;
  }

  return canContinue;
}

export const isValidResetTokenGuard = (routeSnapshot: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const store = inject(Store);

  const token = routeSnapshot.queryParamMap.get('token');
  if(!token) {
    return false;
  }

  return authService.validateResetToken({
    token
  }).pipe(
    map(() => true),
    catchError((err) => {
      store.dispatch(fromApp.AppActions.showAlert({
        options: {
          message: err
        }
      }));
      return of(router.createUrlTree(['/']));
    })
  );
}

export const isUserLoggedInGuard = () => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(fromAuth.AuthSelectors.selectAuthIsAuthenticated).pipe(
    map((isAuth) => {
      const canContinue = !isAuth;
      if(canContinue) {
        return true;
      } else {
        return router.createUrlTree(['/']);
      }
    }),
  );
}