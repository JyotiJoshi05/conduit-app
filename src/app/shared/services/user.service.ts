import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { distinctUntilChanged } from 'rxjs/operators';
import { ApiService } from './api.service';
import { User } from '../models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable()
export class UserService {
  public currentUserSubject = new BehaviorSubject<User>({} as User);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());
  public auth;
  public isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();
  constructor (private apiService: ApiService,
    private http: HttpClient,
    ){
      
    }
    addHeader(){
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json; charset=UTF-8',
         'Accept': 'application/json',
         'Authorization': `Token ${localStorage.getItem('token')}`
        })
      };
      return httpOptions;
    }
  resetAuth() {
    //this.jwtService.destroyToken();
    this.currentUserSubject.next({} as User);
    this.isAuthenticatedSubject.next(false);
    localStorage.clear();
  }
  setAuth(user: User) {
    //this.jwtService.saveToken(user.token);
    localStorage.setItem('token', user.token);
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true); 
  }
  attemptAuth(type, credentials): Observable<any> {
    let route = (type === 'login') ? '/login' : '';
    return this.apiService.post('/users' + route, {user: credentials})
    .map(
      data => {
        this.setAuth(data.user);  
        return data;
      }
    );
  }
  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }
  checkAuth(){
    if(localStorage.getItem('token')){
      this.getUser();
    }
    else{
      this.resetAuth();
    }
  }
  getUser(){
    return this.http.get('https://conduit.productionready.io/api/user',this.addHeader())
    .subscribe(
      (response)=>{
        this.setAuth(response["user"])
      },
      (error)=>{
        console.log("awd")
        this.resetAuth();
      }
    )
  }
  updateUser(credentials): Observable<User> {
    return this.apiService.put('/user', {credentials})
      .map(
        data => {
          return data;
        }
      );
    }      
}