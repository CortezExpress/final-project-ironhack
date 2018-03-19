import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { AccessoryService } from '../../services/accessory.service';
import { environment } from '../../../environments/environment';

import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-accessory-details',
  templateUrl: './accessory-details.component.html',
  styleUrls: ['./accessory-details.component.css']
})
export class AccessoryDetailsComponent implements OnInit {
  accessory = <any>{};

  public updatedAccessory: Object = {};
  public accessoryName: String;
  public accessoryPrice: String;
  public accessoryDescription: String;

  saveError = "";

  baseUrl = environment.apiBase;

  constructor(
    private myAccessoryService: AccessoryService,
    private myAuthService: AuthService,
    private myRoute: ActivatedRoute,
    private myRouter: Router
  ) {}

  ngOnInit() {
    this.myAuthService
      // .checklogin()
      // // If success, we are logged in.
      // .then()

      // Even if you don't do anything on error, catch to avoid a console error.
      // .catch(err => {
      //   console.log(err);
      //   this.myRouter.navigate(["/"]);
      // });
    this.myRoute.params.subscribe(params => {
      this.getAccessoryDetails(params['id']);
    });
  }
  // getting one accessory and its details
  getAccessoryDetails(id) {
    this.myAccessoryService.getId(id).then(theAccessoryDetails => {
      this.accessory = theAccessoryDetails;
    });
  }

  doTheUpdate(id, formData) {
    // console.log("=============== id: ", id);
    const formInfo = formData.form.controls;
    console.log('=============== formData: ', formInfo.accessoryName);
    this.accessoryName = formInfo.accessoryName.value;
    this.accessoryPrice = formInfo.accessoryPrice.value;
    this.accessoryDescription = formInfo.accessoryDescription.value;
    this.sendUpdatesToApi(id);
  }

  sendUpdatesToApi(id) {
    this.updatedAccessory = { accessoryPrice: this.accessory.price, accessoryName: this.accessory.name, accessoryDescription: this.accessory.description };
    console.log('updates:', this.updatedAccessory);
    this.myAccessoryService.updateAccessory(id, this.updatedAccessory)
      .toPromise()
      .then(() => {
        this.myRouter.navigate(['/accessories']);
      })
      .catch();
  }

  deleteThisAccessory(){
    if (!confirm('Are you sure?')) {
      return;
    }
    this.myAccessoryService
      .deleteAccessory(this.accessory._id)
      .then(() => {
        console.log('Success');
        this.myRouter.navigate(['/accessories']);
      })
      .catch(err => {
        alert('Sorry! Something went wrong.');
        console.log('Accessory Delete Error');
        console.log(err);
      });
  }




}
