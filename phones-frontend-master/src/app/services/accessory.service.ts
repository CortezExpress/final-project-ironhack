import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import "rxjs/add/operator/map";
import { environment } from "../../environments/environment";

@Injectable()
export class AccessoryService {

  constructor(private myHttp: Http) {}

  getAllAccessories(){
    return this.myHttp.get(`${environment.apiBase}/api/accessories`,
    { withCredentials: true })
    .map(res => res.json())
  }

  getId(id){
    return this.myHttp.get(`${environment.apiBase}/api/accessories/${id}`,
          { withCredentials: true })
          .toPromise()
          .then(res => res.json())
          // .map(res => res.json())
  }

  createNewAccessory(dataToSend){
    return this.myHttp
      .post(`${environment.apiBase}/api/accessories`, dataToSend, { withCredentials: true })
      .toPromise()
      .then(res => res.json());
  }

  updateAccessory(id, updates){
    return this.myHttp.put(`${environment.apiBase}/api/accessories/${id}`, updates, { withCredentials: true })
    .map(res => res.json());
  }

  deleteAccessory(id){
    return this.myHttp.delete(`${environment.apiBase}/api/accessories/${id}`,
        { withCredentials: true })
        .toPromise()
  }

}