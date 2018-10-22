import { Component, OnInit} from '@angular/core';
import { ApiService, UserService } from '../services';
import { User } from '../models';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit{
  token:boolean;
  currentUser: User;
   auth : boolean;
   username:string;
  constructor(private userService:UserService) {
    if(localStorage.getItem('username')!=null){}
   }
  ngOnInit() {
    
    this.userService.isAuthenticated.subscribe(
      (isauth) => {
        this.auth = isauth;
      }
    );
    this.userService.currentUser.subscribe(
      (userData) => {
        this.currentUser = userData;
      }
    )
  }
  logout(){
    this.userService.resetAuth();
  }
}
