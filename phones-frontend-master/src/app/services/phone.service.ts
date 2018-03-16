import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import "rxjs/add/operator/map";
import { environment } from "../../environments/environment";

@Injectable()
export class PhoneService {

  constructor(private myHttp: Http) {}

  getAllPhones(){
    return this.myHttp.get(`${environment.apiBase}/api/phones`,
    { withCredentials: true })
    .map(res => res.json())
  }

  getId(id){
    return this.myHttp.get(`${environment.apiBase}/api/phones/${id}`,
          { withCredentials: true })
          .toPromise()
          .then(res => res.json())
          // .map(res => res.json())
  }

  createNewPhone(dataToSend){
    return this.myHttp
      .post(`${environment.apiBase}/api/phones`, dataToSend, { withCredentials: true })
      .toPromise()
      .then(res => res.json());
  }

  updatePhone(id, updates){
    return this.myHttp.put(`${environment.apiBase}/api/phones/${id}`, updates, { withCredentials: true })
    .map(res => res.json());
  }

  deletePhone(id){
    return this.myHttp.delete(`${environment.apiBase}/api/phones/${id}`,
        { withCredentials: true })
        .toPromise()
  }

}
