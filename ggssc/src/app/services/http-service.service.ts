import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, from, map, Observable, switchMap, timeout } from 'rxjs';
import  jwt_decode  from 'jwt-decode';
import * as moment from 'moment';
import { Router } from '@angular/router';
const Timeout = 60 * 5 * 1000; //5 mmins

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  constructor(
    private http:HttpClient,
    private router: Router
  ) { }

  get(url:any): Observable<any> {
    return this.http.get<any>(url).pipe(    
      map((resp:any) => {
          return resp
      }),
      timeout(Timeout),
      catchError(error => {
        console.error('Error in PUT request:', error);
        throw error;
      })
    );
  }

  post(url:any, payload:any, headers:any): Observable<any> {
      return this.http.post<any>(url, payload, headers).pipe(    
        map((resp:any) => {
            return resp
        }),
        timeout(Timeout),
        catchError(error => {
          console.error('Error in PUT request:', error);
          throw error;
        })
      );
  }
}
