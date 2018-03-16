import { Component, OnInit } from '@angular/core';
import { PhoneService } from '../../services/phone.service';
import { AuthService } from "../../services/auth.service";
import { FileUploader } from "ng2-file-upload";
import { Router } from "@angular/router";
import { environment } from "../../../environments/environment";


@Component({
  selector: "app-new-phone",
  templateUrl: "./new-phone.component.html",
  styleUrls: ["./new-phone.component.css"]
})
export class NewPhoneComponent implements OnInit {
  phoneData = {
    phoneBrand: "",
    phoneName: "",
    phoneColor: ""
  };
  saveError: string;

  myCoolUploader = new FileUploader({
    url: environment.apiBase + "/api/phones",
    itemAlias: "phoneImage"
  });

  constructor(private myPhoneService: PhoneService, private myAuthService: AuthService, private myRouter: Router) {}

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

  saveNewPhone() {
    if (this.myCoolUploader.getNotUploadedItems().length === 0) {
      this.savePhoneNoImage();
    } else {
      this.savePhoneWithImage();
    }
  }

  private savePhoneNoImage() {
    this.myPhoneService
      .createNewPhone(this.phoneData)
      .then(newPhone => {
        this.phoneData = {
          phoneBrand: "",
          phoneName: "",
          phoneColor: ""
        };
        this.saveError = "";
        this.myRouter.navigate(["/phones"]);
      })
      .catch(err => {
        this.saveError = "Well, saving phone with no image went bad. Sorry!";
      });
  } // close savePhoneNoImage()

  private savePhoneWithImage(){
    this.myCoolUploader.onBuildItemForm = (item, form) => {
      console.log("=============================")
      console.log("in onBuildItemForm - item", item);
      console.log("in onBuildItemForm - form", form);
      console.log("=============================");

      form.append('phoneBrand', this.phoneData.phoneBrand);
      form.append("phoneName", this.phoneData.phoneName);
      form.append("phoneColor", this.phoneData.phoneColor);
    }
    this.myCoolUploader.onSuccessItem = (item, response) =>{
      console.log("=============================");
      console.log("in onSuccessItem - item", item);
      console.log("in onSuccessItem - response", response);
      console.log("=============================");
      this.phoneData = {
          phoneBrand: "",
          phoneName: "",
          phoneColor: ""
        };
        this.saveError = ""
        this.myRouter.navigate(["/phones"]);
    }
    this.myCoolUploader.onErrorItem = (item, response) => {
      this.saveError = "Saving phone with image went bad. Sorry!";
    }
    this.myCoolUploader.uploadAll();
  }

}
