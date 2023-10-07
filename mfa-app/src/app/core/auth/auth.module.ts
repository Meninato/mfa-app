import { NgModule } from "@angular/core";
import { SignInComponent } from "./signin/signin.component";
import { SignUpComponent } from "./signup/signup.component";
import { AuthRoutingModule } from "./auth-routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { SharedFormControlErrorModule } from "@app/shared/shared-form-control-error.module";
import { LoadingButtonComponent } from "@app/shared/components/loading-button/loading-button.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { RxReactiveFormsModule } from "@rxweb/reactive-form-validators";

@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    LoadingButtonComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule, 
    ReactiveFormsModule,
    RxReactiveFormsModule,
    SharedFormControlErrorModule
  ]
})
export class AuthModule {

}