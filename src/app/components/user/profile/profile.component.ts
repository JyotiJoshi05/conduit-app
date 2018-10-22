import { Component, OnInit } from '@angular/core';
import { UserService, User, ArticleService, Article } from '../../../shared';
import { concatMap ,  tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  articles : Array<Article>;
  constructor(private userService:UserService,private articleService:ArticleService,private router:Router) { }
  currentUser: User;
  ngOnInit() {
    this.userService.isAuthenticated.pipe(concatMap(
      (authenticated) => {
        if (!authenticated) {
          this.router.navigateByUrl('/login');
          return of(null);
        }
      }
    ));
    this.userService.currentUser.subscribe(
      (userData) => {
        this.currentUser = userData;
      }
    )
    this.articleService.getArticles(`/articles/?author=`+this.currentUser.username).subscribe(
      data => {
        this.articles = data.articles;
      },
      error => {
        
      }
    );
  }
}
