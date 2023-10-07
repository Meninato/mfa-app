import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule  } from '@angular/platform-browser/animations';

import { AppComponent } from '@app/app.component';
import { ToastrModule } from 'ngx-toastr';
import { HeaderComponent } from '@app/core/layout/header/header.component';
import { FooterComponent } from '@app/core/layout/footer/footer.component';
import { AppRoutingModule } from '@app/app-routing.module';
import { FormErrorMessageService } from './core/services/form-error-message.service';
import { AppConfigService } from './core/services/app-config.service';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';

export function initializeApp(appConfigService: AppConfigService) {
  return () => appConfigService.load();
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
    StoreModule.forRoot()
  ],
  providers: [
    FormErrorMessageService,
    AppConfigService,
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [AppConfigService],
      useFactory: initializeApp
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
