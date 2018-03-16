import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup/signup.component';
// services
import { AuthService } from './services/auth.service';
import { PhoneService } from "./services/phone.service";

// routes
import { AppRoutingModule } from "./app-routing.module";
import { LoginComponent } from './components/login/login.component';
import { PhonesComponent } from './components/phones/phones.component';
import { PhoneDetailsComponent } from './components/phone-details/phone-details.component';
import { NewPhoneComponent } from './components/new-phone/new-phone.component';

// image stuff
import { FileUploadModule } from "ng2-file-upload";


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    PhonesComponent,
    PhoneDetailsComponent,
    NewPhoneComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AppRoutingModule,
    FileUploadModule
  ],
  providers: [AuthService, PhoneService],
  bootstrap: [AppComponent]
})
export class AppModule {}
