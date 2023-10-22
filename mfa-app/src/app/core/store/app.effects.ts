import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as fromApp from '@app/core/store';
import { tap } from "rxjs";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class AppEffects {

  showAlert$ = createEffect(() => 
    this.actions$.pipe(
      ofType(fromApp.AppActions.showAlert),
      tap(({options}) => {
        const alertType = options.alertType ?? 'info';
        if(alertType === "success") {
          this.toastr.success(options.message, options.title);
        } else if(alertType === "info") {
          this.toastr.info(options.message, options.title);
        } else if(alertType === "warning") {
          this.toastr.warning(options.message, options.title);
        } else if(alertType === "error") {
          this.toastr.error(options.message, options.title);
        }
      })
    ), { dispatch: false }
  );

  dummy$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromApp.AppActions.dummy)
    ), { dispatch: false }
  );

  constructor(private actions$: Actions, private toastr: ToastrService) {}
}