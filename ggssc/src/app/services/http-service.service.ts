import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, from, map, Observable, switchMap, timeout } from 'rxjs';
const Timeout = 60 * 5 * 1000; //5 mmins

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  constructor(
    private http:HttpClient,
  ) { }

  get(url:any): Observable<any> {
    return from(this.getOptions()).pipe(
      switchMap(options => this.http.get<any>(url, options)),
      map((resp:any) => {
        return resp
    }),
      timeout(Timeout),
      catchError(error => {
        console.error('Error in GET request:', error);
        throw error;
      })
    );
  }

  post(url:any, payload:any, headers:any): Observable<any> {
    return from(this.getOptions()).pipe(
      switchMap(options => this.http.post<any>(url, payload, options)),
      map((resp:any) => {
        return resp
    }),
      timeout(Timeout),
      catchError(error => {
        console.error('Error in POST request:', error);
        throw error;
      })
    );
  }

  delete(url:any): Observable<any> {
    return from(this.getOptions()).pipe(
      switchMap(options => this.http.delete<any>(url, options)),
      map((resp:any) => {
        return resp
    }),
      timeout(Timeout),
      catchError(error => {
        console.error('Error in Delete request:', error);
        throw error;
      })
    );
  }

  async getOptions(): Promise<Object>{
    const options: any = {};
    const token = localStorage.getItem("idToken");
    if(token){
      options.headers = {
          token: token
      };
    }
    return options
  }
}
