import { NgModule } from '@angular/core';
import { RouterModule ,Routes} from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { UserAuthformComponent } from './user-authform.component';
import { CreateArticleComponent } from '../../articles/create-article/create-article.component';
import { SettingsComponent } from '../settings/settings.component';
import { ProfileComponent } from '../profile/profile.component';
import { HomeComponent } from '../../home/home.component';
import { ArtdetailsComponent } from '../../articles/artdetails/artdetails.component';
import { FeedComponent } from '../feed/feed.component';
import { AuthGuardService as AuthGuard} from 'src/app/shared/services/auth-guard.service';
import { SearchComponent } from '../../articles/search/search.component';
const routes: Routes = [  
  {
    path:'',
    component: HomeComponent
  },
  {
    path:'create',
    component: CreateArticleComponent
  },
  {
    path:'profile',
    component:ProfileComponent, 
    canActivate: [AuthGuard] 
  },  
  {
    path:'feed',
    component:FeedComponent,
    canActivate: [AuthGuard] 
  },
  {
    path: 'article/:slug',
    component:ArtdetailsComponent
    },
    {
      path:'profile/article/:slug',
      component:ArtdetailsComponent
    },
    {
      path:'search/:tag/article/:slug',
      redirectTo: 'article/:slug'
    },
    {
      path:'feed/article/:slug',
      redirectTo: 'article/:slug'
    },
    {
      path:'search/:tag',
      component:SearchComponent
    },
    {
      path: 'login',
      component: UserAuthformComponent,
      canActivate: [AuthGuard] 
    },
    {
      path: 'register',
      component: UserAuthformComponent,
      canActivate: [AuthGuard] 
    }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    SharedModule
  ],
  declarations: [
  ],
  providers: []
})
export class AuthModule {
}