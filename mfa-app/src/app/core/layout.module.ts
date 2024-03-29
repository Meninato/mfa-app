import { NgModule } from "@angular/core";
import { FooterComponent } from "./layout/footer/footer.component";
import { HeaderComponent } from "./layout/header/header.component";
import { UserMenuComponent } from "./layout/header/user-menu/user-menu.component";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { SignInComponent } from "./pages/signin/signin.component";
import { SignUpComponent } from "./pages/signup/signup.component";
import { ForgotPasswordComponent } from "./pages/forgot-password/forgot-password.component";
import { ReactiveFormsModule } from "@angular/forms";
import { RxReactiveFormsModule } from "@rxweb/reactive-form-validators";
import { SharedFormControlErrorModule } from "@app/shared/shared-form-control-error.module";
import { LoadingButtonModule } from "@app/shared/components/loading-button/loading-button.module";
import { DropdownDirective } from "./layout/header/user-menu/dropdown.directive";
import { NotFoundComponent } from "./pages/not-found/not-found.component";
import { ResetPasswordComponent } from "./pages/reset-password/reset-password.component";
import { VerifyEmailComponent } from "./pages/verify-email/verify-email.component";

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    UserMenuComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    VerifyEmailComponent,
    NotFoundComponent,
    DropdownDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    SharedFormControlErrorModule,
    LoadingButtonModule
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    UserMenuComponent
  ]
})
export class LayoutModule {

}