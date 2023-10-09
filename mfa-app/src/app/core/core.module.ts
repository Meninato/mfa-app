import { NgModule } from "@angular/core";
import { HeaderComponent } from "./components/layout/header/header.component";
import { FooterComponent } from "./components/layout/footer/footer.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { UserMenuComponent } from "./components/layout/header/user-menu/user-menu.component";
import { AuthModule } from "./auth/auth.module";

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    UserMenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    UserMenuComponent
  ]
})
export class CoreModule {

}