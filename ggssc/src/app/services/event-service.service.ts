import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpServiceService } from './http-service.service';

@Injectable({
  providedIn: 'root'
})
export class EventServiceService {

  constructor(
    private httpService: HttpServiceService,
    private http:HttpClient
  ) {}

  
  submitEvent(payload:any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    return this.httpService.post(environment.appsEndpoint+"/form/createEvent",payload, {headers});
  }

  saveEvent(payload:any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    return this.httpService.post(environment.appsEndpoint+"/form/saveEvent",payload, {headers});
  }

  deleteEvent(id:any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    return this.httpService.delete(environment.appsEndpoint+"/form/deleteEvent?payloadId="+id);
  }

  getEvents(){
    return this.httpService.get(environment.appsEndpoint+"/form/getEvents");
  }

  getEvent(id:any){
    return this.httpService.get(environment.appsEndpoint+"/form/getEvent?payloadId="+id);
  }
}
