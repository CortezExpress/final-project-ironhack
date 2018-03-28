import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup/signup.component';
// services
import { AuthService } from './services/auth.service';
import { MeatService } from "./services/meat.service";
import { AccessoryService } from "./services/accessory.service"

// routes
import { AppRoutingModule } from "./app-routing.module";
import { LoginComponent } from './components/login/login.component';
import { MeatsComponent } from './components/meats/meats.component';
import { MeatDetailsComponent } from './components/meat-details/meat-details.component';
import { NewMeatComponent } from './components/new-meat/new-meat.component';
import { AccessoriesComponent } from './components/accessories/accessories.component';
import { AccessoryDetailsComponent } from './components/accessory-details/accessory-details.component';
import { NewAccessoryComponent } from './components/new-accessory/new-accessory.component';
// import { UserComponent } from './components/user/user.component';
import { CartComponent } from './components/cart/cart.component';

// image stuff
import { FileUploadModule } from "ng2-file-upload";
import { HomeComponent } from './components/home/home.component';




@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    MeatsComponent,
    MeatDetailsComponent,
    NewMeatComponent,
    AccessoriesComponent,
    AccessoryDetailsComponent,
    NewAccessoryComponent,
    // UserComponent,
    CartComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AppRoutingModule,
    FileUploadModule
  ],
  providers: [AuthService, MeatService, AccessoryService],
  bootstrap: [AppComponent]
})
export class AppModule {}
