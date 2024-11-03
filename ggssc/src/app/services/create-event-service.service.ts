import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpServiceService } from './http-service.service';

@Injectable({
  providedIn: 'root'
})
export class CreateEventServiceService {

  constructor(
    private httpService: HttpServiceService,
    private http:HttpClient
  ) {}

  submitEvent(payload:any){
    return this.http.post(environment.appsEndpoint+"/form/createEvent",payload);
  }
}
