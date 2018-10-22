import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Headers, Http, Response, HttpModule,URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { tokenKey } from '@angular/core/src/view';
@Injectable({
  providedIn: 'root'
})

export class ApiService {
  url:string;
  api_url = "https://conduit.productionready.io/api";
  constructor(
    private http: Http
  ) {}

  private setHeaders(): Headers {
    let headersConfig = {
      'Content-Type': 'application/json; charset=UTF-8',
      'Accept': 'application/json'
    };
    const token = localStorage.getItem('token');
    if (token) {
      headersConfig['Authorization'] = `Token ${token}`;
    }
    return new Headers(headersConfig);
  }
  private formatErrors(error: any) {
     return Observable.throw(error.json());
  }
  get(url_map?:string){
  this.url = url_map? url_map: ``;
    return this.http.get(this.api_url+this.url)
    .map((response:Response)=> {
      return response.json()
    });
  }
  post(path: string, body: Object = {}): Observable<any> { 
    return this.http.post(`${this.api_url}${path}`, 
    JSON.stringify(body), { headers: this.setHeaders() })
        .catch(this.formatErrors)
        .map((res:Response) => {return res.json();});
  }
  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(
      `${this.api_url}${path}`,
      JSON.stringify(body),
      { headers: this.setHeaders() }
    ).catch(this.formatErrors);
  }
  delete(data:string):Observable<any>{
    return this.http.delete(`${this.api_url}${data}`,{headers:this.setHeaders()})
    .catch(this.formatErrors)
    .map((res:Response) => {return res.json();});
  }
}