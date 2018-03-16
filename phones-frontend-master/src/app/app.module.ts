import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup/signup.component';
// services
import { AuthService } from './services/auth.service';
import { MeatService } from "./services/meat.service";

// routes
import { AppRoutingModule } from "./app-routing.module";
import { LoginComponent } from './components/login/login.component';
import { MeatsComponent } from './components/meats/meats.component';
import { MeatDetailsComponent } from './components/meat-details/meat-details.component';
import { NewMeatComponent } from './components/new-meat/new-meat.component';

// image stuff
import { FileUploadModule } from "ng2-file-upload";


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    MeatsComponent,
    MeatDetailsComponent,
    NewMeatComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AppRoutingModule,
    FileUploadModule
  ],
  providers: [AuthService, MeatService],
  bootstrap: [AppComponent]
})
export class AppModule {}
