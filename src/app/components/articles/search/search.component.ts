import { Component, OnInit } from '@angular/core';
import { Errors, ArticleService, UserService, User } from '../../../shared';
import { Article } from '../../../shared/models/article.model';
import { Router, ActivatedRoute,ParamMap } from '@angular/router';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  tag:string;
  tags: Array<string> = [];
  articles:Array<Article>;
  constructor(private articleService: ArticleService,private userService:UserService,private router:Router,private active:ActivatedRoute) { }

  ngOnInit() {
    this.active.paramMap.subscribe( (params: ParamMap) =>{
      this.tag = (params.get('tag'));
    });
    this.articleService.getArticles(`/articles/?tag=`+this.tag).subscribe(
      data => {
        this.articles = data.articles;
      },
      error => {        
      }
    );
    this.articleService.getAllTags()
    .subscribe(tags => {
      this.tags = tags;
    });
    
  }
  getArticlesByTag(tag:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
        this.router.navigate(['search',tag]));
    
  }
}
