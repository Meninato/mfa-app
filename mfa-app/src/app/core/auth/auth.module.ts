import { NgModule } from "@angular/core";
import { SignInComponent } from "./components/signin/signin.component";
import { SignUpComponent } from "./components/signup/signup.component";
import { AuthRoutingModule } from "./auth-routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { SharedFormControlErrorModule } from "@app/shared/shared-form-control-error.module";
import { ForgotPasswordComponent } from "./components/forgot-password/forgot-password.component";
import { RxReactiveFormsModule } from "@rxweb/reactive-form-validators";
import { AuthStoreModule } from "./store/auth-store.module";
import { LoadingButtonModule } from "@app/shared/components/loading-button/loading-button.module";

@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule, 
    ReactiveFormsModule,
    RxReactiveFormsModule,
    SharedFormControlErrorModule,
    AuthStoreModule,
    LoadingButtonModule
  ]
})
export class AuthModule {

}