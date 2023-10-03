import { NgModule } from "@angular/core";
import { SignInComponent } from "./signin/signin.component";
import { SignUpComponent } from "./signup/signup.component";
import { AuthRoutingModule } from "./auth-routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { FormControlErrorModule } from "@app/shared/form-control-error.module";

@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule, 
    ReactiveFormsModule,
    FormControlErrorModule
  ]
})
export class AuthModule {

}