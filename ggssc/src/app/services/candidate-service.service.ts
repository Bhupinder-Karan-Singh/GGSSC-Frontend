import { Injectable } from '@angular/core';
import { HttpServiceService } from './http-service.service';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';

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

  getAllDuplicates(){
      return this.httpService.get(environment.appsEndpoint+"/form/getAllDuplicates");
  }

  getCandidatesList(payloadId:any){
    return this.httpService.get(environment.appsEndpoint+"/form/getCandidatesList?payloadId="+payloadId);
  }

  saveCandidate(payload:any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    return this.httpService.post(environment.appsEndpoint+"/form/saveCandidate", payload, {headers});
  }

  deleteCandidate(id:any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    return this.httpService.delete(environment.appsEndpoint+"/form/deleteCandidate?candidateId="+id);
  }

  removeCandidate(id:any,eventId:any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    return this.httpService.delete(environment.appsEndpoint+"/form/removeCandidate?candidateId="+id+"&&eventId="+eventId);
  }
}
