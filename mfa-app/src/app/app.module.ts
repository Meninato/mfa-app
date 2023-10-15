import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppComponent } from '@app/app.component';
import { AppConfigService } from './core/services/app-config.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { TokenInterceptor } from './core/interceptors/token.interceptor';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';

export function initializeApp(appConfigService: AppConfigService) {
  return () => appConfigService.load();
}

// export function initApplication(store: Store<AppState>) {
//   return () =>
//     new Promise(resolve => {
//       const loaded$ = new Subject();
//       store.dispatch(new LoadSystem());
//       store
//         .select((state:AppState) => state.isLoaded)
//         .pipe(takeUntil(loaded$))
//         .subscribe(loaded => {
//           if (loaded) {
//             loaded$.next();
//             resolve();
//           }
//         });
//     });
// }

@NgModule({
  declarations: [
    AppComponent  
  ],
  imports: [
    CoreModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [AppConfigService],
      useFactory: initializeApp
    },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
