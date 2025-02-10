import { Injectable } from '@angular/core';
import { HttpServiceService } from './http-service.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CandidateServiceService {

  constructor(
    private httpService: HttpServiceService,
  ) { }

  getAllCandidates(){
      return this.httpService.get(environment.appsEndpoint+"/form/getAllCandidates");
    }
}
