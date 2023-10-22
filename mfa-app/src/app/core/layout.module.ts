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

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    UserMenuComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
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