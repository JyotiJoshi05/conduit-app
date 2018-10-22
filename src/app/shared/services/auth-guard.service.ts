import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from '..';
import { concatMap ,  tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{
  constructor(public userService: UserService, public router: Router) {}

  canActivate(): boolean {
    if (localStorage.getItem('token')===null) {
      this.router.navigate(['/login']);
      return false;
    }
    if (localStorage.getItem('token')!=null) {
      this.router.navigate(['/feed']);
      return false;
    }
    return true;
  }
  
}
