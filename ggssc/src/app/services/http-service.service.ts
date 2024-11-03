import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, timeout } from 'rxjs';

const Timeout = 60 * 5 * 1000; //5 mmins

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  constructor(
    private http:HttpClient
  ) { }

  put( url:any, payload:any): Observable<any> {
    const options: any = {};
    options['headers'] = {}
    options['headers']['Access-Control-Allow-Origin'] = ""
    options['headers']['Access-Control-Allow-Origin'] = window.location.origin 
    return this.http.put<any>(url, payload, options).pipe(    
      map((resp:any) => {
          return resp
      }),timeout(Timeout),
          catchError(error => {
            console.error('Error in PUT request:', error);
            throw error;
          })
        );
    }
}
