import { Component, OnInit ,Input} from '@angular/core';
import { Article, ArticleService } from '../../../shared';
import {Router, ActivatedRoute} from '@angular/router';
@Component({
  selector: 'article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent{
  @Input() articles:Array<Article>;
  @Input() fav:boolean = false;
  article:Article;
  constructor(private router:Router,private active:ActivatedRoute) { }
  getDetails(article){
    this.router.navigate(['article', article.slug], { relativeTo: this.active});
  }  
  onToggleFavorite(favorited: boolean,article:Article) {
    article.favorited = favorited;
    if (favorited) {
      article.favoritesCount++;
    } else {
      article.favoritesCount--;
    }
  }
}
