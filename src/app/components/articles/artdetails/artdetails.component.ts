import { Component, OnInit } from '@angular/core';
import { Errors, ArticleService, UserService, User, Article } from '../../../shared';
import { Router, ActivatedRoute,ParamMap } from '@angular/router';
@Component({
  selector: 'app-artdetails',
  templateUrl: './artdetails.component.html',
  styleUrls: ['./artdetails.component.css']
})
export class ArtdetailsComponent implements OnInit {
  comments:Array<Comment>;
  article:Article;
  slug:string;
  currentUser:User;
  auth:boolean = false;
  author :boolean = false;
  errors: Errors = new Errors();
  constructor(private articleService: ArticleService,private userService:UserService,private router:Router,private active:ActivatedRoute) {
  }
  ngOnInit(){
    this.active.paramMap.subscribe( (params: ParamMap) =>{
      this.slug = (params.get('slug'));
    });
    this.articleService.getArticle(`/`+this.slug).subscribe(
      data => {
        this.article = data.article;
        this.articleService.clickedArt = this.article;
        if(this.currentUser.username === this.article.author.username){
          this.author= true;
        } 
      },
      error => {
      }
    )
    this.userService.isAuthenticated.subscribe(
      (isauth) => {
        this.auth = isauth;
      }      
    );    
    this.articleService.getComments(`/articles/`+this.slug+`/comments/`).subscribe(
      data => {
        this.comments = data.comments;
      },
      error => {
      }
    );
    this.userService.currentUser.subscribe(
      (userData) => {
        this.currentUser = userData;
      }
    );    
  }
  editArticle(){
    this.articleService.editArt = this.article;
    this.router.navigate(['/create']);
  }
  deleteArticle(){
    this.articleService.deleteArticle(this.article.slug)
    .subscribe(
      data => { 
        this.router.navigate(['/profile']);
      },
      error => {
        this.errors = error;
      }
    );
  }
}
