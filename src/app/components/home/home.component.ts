import { Component, OnInit ,EventEmitter} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Errors, ArticleService,UserService } from '../../shared';
import { Article } from '../../shared/models/article.model';
@Component({
  selector: 'home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  articles:Array<Article>;
  article:Article;
  auth:boolean;
  // toggle: EventEmitter<boolean> = new EventEmitter();
  tags: Array<string> = [];
  constructor(private userService:UserService,private articleService: ArticleService,private router:Router,private active:ActivatedRoute) {}
  ngOnInit(){
    this.userService.isAuthenticated.subscribe(
      (isauth) => {
        this.auth = isauth;
      }
    );
    this.articleService.getAllTags()
    .subscribe(tags => {
      this.tags = tags;
    });
    this.articleService.getArticles(`/articles/?limit=500`).subscribe(
      data => {
        this.articles = data.articles;
      },
      error => {        
      }
    );
  }
  getDetails(article){
    this.articleService.clickedArt = article;
      this.router.navigate(['article', article.slug], { relativeTo: this.active});
  }  
  getArticlesByTag(tag:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
        this.router.navigate(['search',tag]));
    
  }
  
    // toggleFavorite(favorited:boolean,article:Article) {
    //   this.article = article;
    //   this.userService.isAuthenticated.pipe(concatMap(
    //     (isAuth) => {
    //       if (!isAuth) {
    //         this.router.navigateByUrl('/login');
    //         return of(null);
    //       }
    //       if (favorited) {
    //         this.article.favoritesCount++;
    //       } else {
    //         this.article.favoritesCount--;
    //       }
    //       if (!article.favorited) {
    //         return this.articleService.favorite(article.slug)
    //         .pipe(tap(
    //           data => {
    //             this.toggle.emit(true);
    //           },
    //           err => {}
    //         ));

    //       } else {
    //         return this.articleService.unfavorite(article.slug)
    //         .pipe(tap(
    //           data => {
    //             this.toggle.emit(false);
    //           },
    //         ));
    //       }
    //     }
    //   )).subscribe();
    // }
}