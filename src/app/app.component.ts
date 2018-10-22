import { Component } from '@angular/core';
import { UserService } from './shared';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'conduit-app';
  constructor(private userService:UserService) { 
    this.userService.checkAuth();
  }
}
