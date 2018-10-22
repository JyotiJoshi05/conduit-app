import { Component, OnInit } from '@angular/core';
import { Article, UserService, ArticleService, User } from 'src/app/shared';
import { Router } from '@angular/router';
import { concatMap ,  tap } from 'rxjs/operators';
import { of } from 'rxjs';
@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['../../home/home.component.css']
})
export class FeedComponent implements OnInit {
  articles : Array<Article>;
  constructor(private userService:UserService,private articleService:ArticleService,private router:Router) { }
  currentUser: User;
  auth:boolean;
  ngOnInit() {
    this.userService.isAuthenticated.pipe(concatMap(
      (authenticated) => {
        //this.auth = authenticated;
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
    this.articleService.getArticles(`/articles/?favorited=`+this.currentUser.username).subscribe(
      data => {
        this.articles = data.articles;
      },
      error => {
      }
    );
  }

}
