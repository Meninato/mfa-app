import { NgModule } from "@angular/core";
import { Route, RouterModule, PreloadAllModules } from "@angular/router";

const routes: Route[] = [
  {
    path: 'auth',
    loadChildren: () => import('@app/core/auth/auth.module').then((m) => m.AuthModule)
  },
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