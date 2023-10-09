import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { AUTH_FEATURE_KEY, authReducer } from "./auth.reducer";
import { EffectsModule } from "@ngrx/effects";
import { AuthEffects } from "./auth.effects";

@NgModule({
  imports: [
    StoreModule.forFeature(AUTH_FEATURE_KEY, authReducer),
    EffectsModule.forFeature([AuthEffects])
  ],
  exports: [StoreModule, EffectsModule]
})
export class AuthStoreModule {

}