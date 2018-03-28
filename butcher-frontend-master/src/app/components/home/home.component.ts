import { Component, OnInit } from '@angular/core';

import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { MeatService } from "../../services/meat.service";
import { environment } from "../../../environments/environment";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: any = {};
  logoutError: string;
  errorMessage: string;
  
  constructor(
    private myAuthService: AuthService,
    private myMeatService: MeatService,
    private myRouter: Router
  ) {}

  ngOnInit() {
  }

  logMeOutPls() {
    this.myAuthService
      .logout()
      .then(() => {
        this.myRouter.navigate(["/login"]);
      })
      .catch(() => {
        this.logoutError = "Log out went bad.";
      });
  } // close logMeOutPls()

}
