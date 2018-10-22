import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { UserAuthformComponent } from './components/user/user-authform/user-authform.component';
import { AuthModule } from './components/user/user-authform/user-authmodule.module';
import {
  FooterComponent,
  HeaderComponent,
  SharedModule,
  ApiService,
  UserService
} from './shared';
import { RouterModule } from '@angular/router';
import { CreateArticleComponent } from './components/articles/create-article/create-article.component';
import { SettingsComponent } from './components/user/settings/settings.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { ArtdetailsComponent } from './components/articles/artdetails/artdetails.component';
import { CommentsComponent } from './components/comment/comments/comments.component';
import { ArticleListComponent } from './components/articles/article-list/article-list.component';
import { CreateCommentComponent } from './components/comment/create-comment/create-comment.component';
import { SingleCommentComponent } from './components/comment/single-comment/single-comment.component';
import { SearchComponent } from './components/articles/search/search.component';
import { FavoriteButtonComponent } from './components/articles/favorite-button/favorite-button.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FeedComponent } from './components/user/feed/feed.component';
import { HomeComponent } from './components/home/home.component';
const rootRouting: ModuleWithProviders = RouterModule.forRoot([], { useHash: true });
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    UserAuthformComponent,
    CreateArticleComponent,
    SettingsComponent,
    ProfileComponent,
    ArtdetailsComponent,
    CommentsComponent,
    CreateCommentComponent,
    SingleCommentComponent,
    SearchComponent,
    HomeComponent,
    FeedComponent,
    ArticleListComponent,  
    FavoriteButtonComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SharedModule,
    AuthModule,
    rootRouting,
    FontAwesomeModule

  ],
  providers: [ApiService,UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
