import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { SignInComponent } from "@app/core/auth/signin/signin.component";
import { SignUpComponent } from "./signup/signup.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";

const routes: Route[] = [
  { 
    path: '',
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'signin' },
      {
        path: 'signin',
        component: SignInComponent
      },
      {
        path: 'signup',
        component: SignUpComponent
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {

}