import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpServiceService } from './http-service.service';

@Injectable({
  providedIn: 'root'
})
export class EventServiceService {

  eventName:any;

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

  registerEvent(payload:any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    return this.httpService.post(environment.appsEndpoint+"/form/registerEvent",payload, {headers});
  }

  sendOtp(payload:any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    return this.httpService.post(environment.appsEndpoint+"/form/sendOtp",payload, {headers});
  }

  verifyOtp(payload:any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    return this.httpService.post(environment.appsEndpoint+"/form/verifyOtp",payload, {headers});
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

  getAllEvents(){
    return this.httpService.get(environment.appsEndpoint+"/form/getAllEvents");
  }

  getEvent(id:any){
    return this.httpService.get(environment.appsEndpoint+"/form/getEvent?payloadId="+id);
  }
}
