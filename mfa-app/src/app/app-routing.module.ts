import { NgModule, inject } from "@angular/core";
import { Route, RouterModule, PreloadAllModules } from "@angular/router";
import { HomeComponent } from "./core/pages/home/home.component";
import { SignInComponent } from "./core/pages/signin/signin.component";
import { SignUpComponent } from "./core/pages/signup/signup.component";
import { ForgotPasswordComponent } from "./core/pages/forgot-password/forgot-password.component";
import { isUserLoggedInGuard } from "./core/guards/auth.guard";
import { NotFoundComponent } from "./core/pages/not-found/not-found.component";

const routes: Route[] = [
  {
    path: '', pathMatch: 'full', 
    component: HomeComponent
  },
  { 
    path: 'auth',
    canActivate: [isUserLoggedInGuard],
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
  },
  {
    path: '404', 
    component: NotFoundComponent
  },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}