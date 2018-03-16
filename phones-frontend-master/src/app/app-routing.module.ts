import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SignupComponent } from "./components/signup/signup.component";
import { LoginComponent } from "./components/login/login.component";
import { MeatsComponent } from "./components/meats/meats.component";
import { MeatDetailsComponent } from "./components/meat-details/meat-details.component";
import { NewMeatComponent } from "./components/new-meat/new-meat.component";

const routes: Routes = [
  {
    path: "",
    component: LoginComponent
  },
  {
    path: "signup",
    component: SignupComponent
  },

  {
    path: "meats",
    component: MeatsComponent
  },
  {
    path: "meats/:id",
    component: MeatDetailsComponent
  },
  {
    path: "add-meat",
    component: NewMeatComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
