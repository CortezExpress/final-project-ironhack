import { Component, OnInit } from '@angular/core';

import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { AccessoryService } from "../../services/accessory.service";
import { environment } from "../../../environments/environment";

import "rxjs/add/operator/toPromise";

@Component({
  selector: 'app-accessories',
  templateUrl: './accessories.component.html',
  styleUrls: ['./accessories.component.css']
})
export class AccessoriesComponent implements OnInit {
  currentUser: any = {};
  logoutError: string;
  accessories: Array<Object> = [];
  AccessoryListError: string;


 constructor(
    private myAuthService: AuthService,
    private myAccessoryService: AccessoryService,
    private myRouter: Router
  ) {}

  ngOnInit() {
    this.myAuthService
      .checklogin()
      // If success, we are logged in.
      .then(resultFromApi => {
        this.currentUser = resultFromApi;
        this.getTheAccessories()
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


  // get all the accessories
  getTheAccessories() {
    this.myAccessoryService.getAllAccessories()
    .subscribe(allTheAccessories => {
      console.log("allTheAccessories: ", allTheAccessories)
        this.accessories = allTheAccessories;
      },
      () => {
        this.AccessoryListError = "Sorry, no accessories.";
      }
    );
  } // close getTheAccessories()


}
