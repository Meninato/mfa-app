import { NgModule, Optional, SkipSelf } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { ToastrModule } from "ngx-toastr";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { AppRoutingModule } from "@app/app-routing.module";
import { LayoutModule } from "./layout.module";

@NgModule({
  imports: [
    HttpClientModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    StoreModule.forRoot(),
    EffectsModule.forRoot(),
  ],
  exports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    AppRoutingModule
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if(parentModule) {
      throw new Error(`${parentModule.constructor.name} has already been loaded. Import this module in the AppModule only.`);
    }
  }
}