import { Component, OnInit } from '@angular/core';
import { MeatService } from '../../services/meat.service';
import { AuthService } from "../../services/auth.service";
import { FileUploader } from "ng2-file-upload";
import { Router } from "@angular/router";
import { environment } from "../../../environments/environment";


@Component({
  selector: "app-new-meat",
  templateUrl: "./new-meat.component.html",
  styleUrls: ["./new-meat.component.css"]
})
export class NewMeatComponent implements OnInit {
  meatData = {
    meatType: "",
    meatName: "",
    meatPrice: ""
  };
  saveError: string;

  myCoolUploader = new FileUploader({
    url: environment.apiBase + "/api/meats",
    itemAlias: "meatImage"
  });

  constructor(private myMeatService: MeatService, private myAuthService: AuthService, private myRouter: Router) {}

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
  }

  saveNewMeat() {
    if (this.myCoolUploader.getNotUploadedItems().length === 0) {
      this.saveMeatNoImage();
    } else {
      this.saveMeatWithImage();
    }
  }

  private saveMeatNoImage() {
    this.myMeatService
      .createNewMeat(this.meatData)
      .then(newMeat => {
        this.meatData = {
          meatType: "",
          meatName: "",
          meatColor: ""
        };
        this.saveError = "";
        this.myRouter.navigate(["/meats"]);
      })
      .catch(err => {
        this.saveError = "Well, saving meat with no image went bad. Sorry!";
      });
  } // close saveMeatNoImage()

  private saveMeatWithImage(){
    this.myCoolUploader.onBuildItemForm = (item, form) => {
      console.log("=============================")
      console.log("in onBuildItemForm - item", item);
      console.log("in onBuildItemForm - form", form);
      console.log("=============================");

      form.append('meatType', this.meatData.meatType);
      form.append("meatName", this.meatData.meatName);
      form.append("meatColor", this.meatData.meatPrice);
    }
    this.myCoolUploader.onSuccessItem = (item, response) =>{
      console.log("=============================");
      console.log("in onSuccessItem - item", item);
      console.log("in onSuccessItem - response", response);
      console.log("=============================");
      this.meatData = {
        meatType: "",
        meatName: "",
        meatColor: ""
        };
        this.saveError = ""
        this.myRouter.navigate(["/meats"]);
    }
    this.myCoolUploader.onErrorItem = (item, response) => {
      this.saveError = "Saving meat with image went bad. Sorry!";
    }
    this.myCoolUploader.uploadAll();
  }

}
