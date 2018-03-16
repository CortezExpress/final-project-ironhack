import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import "rxjs/add/operator/map";
import { environment } from "../../environments/environment";

@Injectable()
export class MeatService {

  constructor(private myHttp: Http) {}

  getAllMeats(){
    return this.myHttp.get(`${environment.apiBase}/api/meats`,
    { withCredentials: true })
    .map(res => res.json())
  }

  getId(id){
    return this.myHttp.get(`${environment.apiBase}/api/meats/${id}`,
          { withCredentials: true })
          .toPromise()
          .then(res => res.json())
          // .map(res => res.json())
  }

  createNewMeat(dataToSend){
    return this.myHttp
      .post(`${environment.apiBase}/api/meats`, dataToSend, { withCredentials: true })
      .toPromise()
      .then(res => res.json());
  }

  updateMeat(id, updates){
    return this.myHttp.put(`${environment.apiBase}/api/meats/${id}`, updates, { withCredentials: true })
    .map(res => res.json());
  }

  deleteMeat(id){
    return this.myHttp.delete(`${environment.apiBase}/api/meats/${id}`,
        { withCredentials: true })
        .toPromise()
  }

}
