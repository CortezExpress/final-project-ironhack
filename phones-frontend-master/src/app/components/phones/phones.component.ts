import { Component, OnInit } from '@angular/core';

import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { PhoneService } from "../../services/phone.service";
import { environment } from "../../../environments/environment";

@Component({
  selector: "app-phones",
  templateUrl: "./phones.component.html",
  styleUrls: ["./phones.component.css"]
})
export class PhonesComponent implements OnInit {
  currentUser: any = {};
  logoutError: string;
  phones: Array<Object> = [];
  phoneListError: string;

  constructor(
    private myAuthService: AuthService,
    private myPhoneService: PhoneService,
    private myRouter: Router
  ) {}

  ngOnInit() {
    this.myAuthService
      .checklogin()
      // If success, we are logged in.
      .then(resultFromApi => {
        this.currentUser = resultFromApi;
        this.getThePhones()
      })

      // Even if you don't do anything on error, catch to avoid a console error.
      .catch(err => {
        console.log(err);
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


  // get all the phones
  getThePhones() {
    this.myPhoneService.getAllPhones()
    .subscribe(allThePhones => {
      console.log("allThePhones: ", allThePhones)
        this.phones = allThePhones;
      },
      () => {
        this.phoneListError = "Sorry, no phones.";
      }
    );
  } // close getThePhones()


}
