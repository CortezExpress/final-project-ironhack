import { Component, OnInit } from '@angular/core';
import { AccessoryService } from '../../services/accessory.service';
import { AuthService } from "../../services/auth.service";
import { FileUploader } from "ng2-file-upload";
import { Router } from "@angular/router";
import { environment } from "../../../environments/environment";


@Component({
  selector: 'app-new-accessory',
  templateUrl: './new-accessory.component.html',
  styleUrls: ['./new-accessory.component.css']
})
export class NewAccessoryComponent implements OnInit {
    accessoryData = {
    accessoryDescription: "",
    accessoryName: "",
    accessoryPrice: ""
  };
  saveError: string;

  myCoolUploader = new FileUploader({
    url: environment.apiBase + "/api/accessories",
    itemAlias: "accessoryImage"
  });

  constructor(private myAccessoryService: AccessoryService, private myAuthService: AuthService, private myRouter: Router) {}

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

  saveNewAccessory() {
    if (this.myCoolUploader.getNotUploadedItems().length === 0) {
      this.saveAccessoryNoImage();
    } else {
      this.saveAccessoryWithImage();
    }
  }

  private saveAccessoryNoImage() {
    this.myAccessoryService
      .createNewAccessory(this.accessoryData)
      .then(newAccessory => {
        this.accessoryData = {
          accessoryName: "",
          accessoryPrice: "",
          accessoryDescription: ""
        };
        this.saveError = "";
        this.myRouter.navigate(["/accessories"]);
      })
      .catch(err => {
        this.saveError = "Well, saving accessory with no image went bad. Sorry!";
      });
  } // close saveAccessoryNoImage()

  private saveAccessoryWithImage(){
    this.myCoolUploader.onBuildItemForm = (item, form) => {
      console.log("=============================")
      console.log("in onBuildItemForm - item", item);
      console.log("in onBuildItemForm - form", form);
      console.log("=============================");

      form.append('accessoryPrice', this.accessoryData.accessoryPrice);
      form.append("accessoryName", this.accessoryData.accessoryName);
      form.append("accessoryDescription", this.accessoryData.accessoryDescription);
    }
    this.myCoolUploader.onSuccessItem = (item, response) =>{
      console.log("=============================");
      console.log("in onSuccessItem - item", item);
      console.log("in onSuccessItem - response", response);
      console.log("=============================");
      this.accessoryData = {
        accessoryName: "",
        accessoryPrice: "",
        accessoryDescription: ""
        };
        this.saveError = ""
        this.myRouter.navigate(["/accessories"]);
    }
    this.myCoolUploader.onErrorItem = (item, response) => {
      this.saveError = "Saving accessory with image went bad. Sorry!";
    }
    this.myCoolUploader.uploadAll();
  }

}

