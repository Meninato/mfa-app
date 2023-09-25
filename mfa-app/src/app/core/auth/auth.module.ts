import { NgModule } from "@angular/core";
import { SignInComponent } from "./signin/signin.component";
import { SignUpComponent } from "./signup/signup.component";
import { AuthRoutingModule } from "./auth-routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import { FormFieldErrorComponent } from "@app/shared/components/form-field-error/form-field-error.component";
import { CommonModule } from "@angular/common";
import { SubmitFormComponent } from "@app/shared/components/submit-form/submit-form.component";

@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent,
    FormFieldErrorComponent,
    SubmitFormComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule, 
    ReactiveFormsModule
  ]
})
export class AuthModule {

}