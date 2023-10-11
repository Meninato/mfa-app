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
        this.toastr.info(options.message, options.title);
      })
    ), { dispatch: false }
  );

  constructor(private actions$: Actions, private toastr: ToastrService) {}
}