import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { map, of, tap, withLatestFrom } from "rxjs";
import * as fromAuth from '@app/core/store/auth';

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