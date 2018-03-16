import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

import { AuthService } from "../../services/auth.service";
import { MeatService } from "../../services/meat.service";
import { environment } from "../../../environments/environment";

import "rxjs/add/operator/toPromise";

@Component({
  selector: "app-meat-details",
  templateUrl: "./meat-details.component.html",
  styleUrls: ["./meat-details.component.css"]
})
export class MeatDetailsComponent implements OnInit {
  meat = <any>{};

  public updatedMeat: Object = {};
  public meatName: String;
  public meatType: String;
  public meatColor: String;

  // meatData = {
  //   meatType:"",
  //   meatName:"",
  //   meatColor:"",
  //   meatImage:""
  // }
  saveError = "";

  baseUrl = environment.apiBase;

  constructor(
    private myMeatService: MeatService,
    private myAuthService: AuthService,
    private myRoute: ActivatedRoute,
    private myRouter: Router
  ) {}

  ngOnInit() {
    this.myAuthService
      .checklogin()
      // If success, we are logged in.
      .then()

      // Even if you don't do anything on error, catch to avoid a console error.
      .catch(err => {
        console.log(err);
        this.myRouter.navigate(["/"]);
      });
    this.myRoute.params.subscribe(params => {
      this.getMeatDetails(params["id"]);
    });
  }
  // getting one meat and its details
  getMeatDetails(id) {
    this.myMeatService.getId(id).then(theMeatDetails => {
      this.meat = theMeatDetails;
    });
  }

  doTheUpdate(id, formData) {
    // console.log("=============== id: ", id);
    const formInfo = formData.form.controls;
    console.log("=============== formData: ", formInfo.meatName);
    this.meatType = formInfo.meatType.value;
    this.meatName = formInfo.meatName.value;
    this.meatColor = formInfo.meatColor.value;
    this.sendUpdatesToApi(id);
  }

  sendUpdatesToApi(id){
    this.updatedMeat = { meatType: this.meat.brand, meatName: this.meat.name, meatColor: this.meat.color };
    console.log("updates:", this.updatedMeat)
    this.myMeatService.updateMeat(id, this.updatedMeat)
      .toPromise()
      .then(()=>{
        this.myRouter.navigate(['/meats'])
      })
      .catch()
  }

  deleteThisMeat(){
    if (!confirm("Are you sure?")) {
      return;
    }
    this.myMeatService
      .deleteMeat(this.meat._id)
      .then(() => {
        console.log("Success");
        this.myRouter.navigate(["/meats"]);
      })
      .catch(err => {
        alert("Sorry! Something went wrong.");
        console.log("Meat Delete Error");
        console.log(err);
      });
  }




}
