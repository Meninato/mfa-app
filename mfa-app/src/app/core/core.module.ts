import { APP_INITIALIZER, NgModule, Optional, SkipSelf } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { ToastrModule } from "ngx-toastr";
import { Store, StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { AppRoutingModule } from "@app/app-routing.module";
import { LayoutModule } from "./layout.module";
import { AppEffects } from "./store/app.effects";
import * as fromApp from '@app/core/store';
import { AppConfigService } from "./services/app-config.service";
import { TokenInterceptor } from "./interceptors/token.interceptor";
import { ErrorInterceptor } from "./interceptors/error.interceptor";
import * as fromAuth from '@app/core/store/auth';
import { EMPTY, catchError, switchMap, take, tap } from "rxjs";
import { AuthEffects } from "./store/auth/auth.effects";
import { AuthService } from "./services/auth.service";
import { LocalStorageService } from "./services/local-storage.service";

export function initializeApp(appConfigService: AppConfigService, 
  authService: AuthService, store: Store, localStorageService: LocalStorageService) {
  return () => appConfigService.load().pipe(
    switchMap(() => authService.loginWithToken().pipe(
      take(1),
      tap((response) => {
        store.dispatch(fromAuth.AuthActions.loadSession({response}));
      }),
      catchError(() => {
        localStorageService.removeItem('token');
        return EMPTY;
      })
    ))
  );
}

@NgModule({
  imports: [
    HttpClientModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    StoreModule.forRoot(fromApp.AppReducer.appReducer),
    EffectsModule.forRoot([
      AppEffects,
      AuthEffects
    ]),
  ],
  exports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    AppRoutingModule
  ],
  providers:[
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [AppConfigService, AuthService, Store, LocalStorageService],
      useFactory: initializeApp
    },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if(parentModule) {
      throw new Error(`${parentModule.constructor.name} has already been loaded. Import this module in the AppModule only.`);
    }
  }
}