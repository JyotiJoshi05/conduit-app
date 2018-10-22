import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';
import { of } from 'rxjs';
import { concatMap ,  tap } from 'rxjs/operators';
import { ArticleService, UserService, Article } from 'src/app/shared';
import { Router } from '@angular/router';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-favorite-button',
  templateUrl: './favorite-button.component.html'
})
export class FavoriteButtonComponent {
  constructor(
    private articlesService: ArticleService,
    private router: Router,
    private userService: UserService
  ) {}

  @Input() article: Article;
  @Output() toggle = new EventEmitter<boolean>();
  isSubmitting = false;
  heart = faHeart;
  toggleFavorite() {
    this.isSubmitting = true;

    this.userService.isAuthenticated.pipe(concatMap(
      (authenticated) => {
        if (!authenticated) {
          this.router.navigateByUrl('/login');
          return of(null);
        }

        if (!this.article.favorited) {
          return this.articlesService.favorite(this.article.slug)
          .pipe(tap(
            data => {
              this.isSubmitting = false;
              this.toggle.emit(true);
            },
            err => this.isSubmitting = false
          ));

        } else {
          return this.articlesService.unfavorite(this.article.slug)
          .pipe(tap(
            data => {
              this.isSubmitting = false;
              this.toggle.emit(false);
            },
            err => this.isSubmitting = false
          ));
        }

      }
    )).subscribe();
  }
}
