import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { AUTH_FEATURE_KEY, authReducer } from "./auth.reducer";

@NgModule({
  imports: [
    StoreModule.forFeature(AUTH_FEATURE_KEY, authReducer)
  ],
  exports: [StoreModule]
})
export class AuthStoreModule {

}