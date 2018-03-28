import { Component, OnInit } from '@angular/core';

import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { MeatService } from "../../services/meat.service";
import { environment } from "../../../environments/environment";

@Component({
  selector: "app-meats",
  templateUrl: "./meats.component.html",
  styleUrls: ["./meats.component.css"]
})
export class MeatsComponent implements OnInit {
  currentUser: any = {};
  logoutError: string;
  meats: Array<Object> = [];
  meatListError: string;
  errorMessage: string;

  constructor(
    private myAuthService: AuthService,
    private myMeatService: MeatService,
    private myRouter: Router
  ) {}

  ngOnInit() {
    this.myAuthService
      .checklogin()
      // If success, we are logged in.
      .then(resultFromApi => {
        this.currentUser = resultFromApi;
        this.getTheMeats()
      })

      // Even if you don't do anything on error, catch to avoid a console error.
      .catch(err => {
        console.log(err);
        // this.errorMessage = "Please login in order to proceed!"
        this.myRouter.navigate(["/"]);
      });
  }

  logMeOutPls() {
    this.myAuthService
      .logout()
      .then(() => {
        this.myRouter.navigate(["/"]);
      })
      .catch(() => {
        this.logoutError = "Log out went bad.";
      });
  } // close logMeOutPls()


  // get all the meats
  getTheMeats() {
    this.myMeatService.getAllMeats()
    .subscribe(allTheMeats => {
      console.log("allTheMeats: ", allTheMeats)
        this.meats = allTheMeats;
      },
      () => {
        this.meatListError = "Sorry, no meats.";
      }
    );
  } // close getTheMeats()


}
