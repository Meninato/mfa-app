import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule  } from '@angular/platform-browser/animations';

import { AppComponent } from '@app/app.component';
import { ToastrModule } from 'ngx-toastr';
import { HeaderComponent } from '@app/core/layout/header/header.component';
import { FooterComponent } from '@app/core/layout/footer/footer.component';
import { AppRoutingModule } from '@app/app-routing.module';
import { FormErrorMessageService } from './core/services/form-error-message.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AppRoutingModule
  ],
  providers: [FormErrorMessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
