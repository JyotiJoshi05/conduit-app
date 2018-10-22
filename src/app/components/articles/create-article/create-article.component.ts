import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ArticleService,Errors ,Article, UserService, User} from '../../../shared';
import { Router } from '@angular/router';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { of } from 'rxjs';
import { concatMap ,  tap } from 'rxjs/operators';
@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css']
})
export class CreateArticleComponent implements OnInit {
  errors: Errors = new Errors();
  cross = faTimes;
  currentuser:User;
  tagField = new FormControl();
  article: Article = {} as Article;
  createArticleForm : FormGroup= new FormGroup({
    'title': new FormControl(Validators.required),
    'description': new FormControl(Validators.required),
    'body': new FormControl(Validators.required),
  });
  constructor(private articleService:ArticleService,private userService:UserService,private router:Router) { 
    this.article.tagList = [];
  }

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
        this.currentuser = userData;
      }
    );
    if(this.articleService.editArt != null){
      this.article = this.articleService.editArt;
      this.articleService.editArt = null;
      console.log(this.article.slug);
    }
  }
  addTag() {
    const tag = this.tagField.value;
    if (this.article.tagList.indexOf(tag) < 0) {
      this.article.tagList.push(tag);
    }
    this.tagField.reset('');
  }

  removeTag(tagName: string) {
    this.article.tagList = this.article.tagList.filter(tag => tag !== tagName);
  }

  createArticle() {
    let articledata = this.createArticleForm.value;
    articledata.slug = this.article.slug;
    this.articleService.createArticle(articledata)
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