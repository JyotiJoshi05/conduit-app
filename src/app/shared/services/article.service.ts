import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ApiService } from './api.service';
import { Article } from '../models/article.model';
@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  clickedArt:Article;
  editArt:Article;
  clickedArtComments:Array<Comment>;
  constructor(private apiService: ApiService,
    private http: Http) {}
    getArticles(data?:string): Observable<any> {
      return this.apiService.get(data)
      .map(
        data => { 
          return data;
        }
      );
    }
    getAllTags(): Observable<[string]> {
      return this.apiService.get('/tags')
            .map(data => data.tags);
    }
    getComments(url):Observable<any>{
      return this.apiService.get(url)
      .map(
        data=>{
          return data;
        }
      )
    }
    deleteComment(slug:string,id:number){
      return this.apiService.delete('/articles/'+slug+'/comments/'+id)
      .map(
        data=>{
          return data;
        }
      )
    }
    getArticle(slug):Observable<any>{
      return this.apiService.get(`/articles`+slug)
      .map(
        data=>{
          return data;
        }
      )
    }
    createArticle(article): Observable<Article> {
      if (article.slug) {
        return this.apiService.put('/articles/'+article.slug, {article})
        .map(
          data => {
            return data;
          }
        );
      }
      else{
        return this.apiService.post('/articles', {article})
        .map(
          data => {
            return data;
          }
        );
      }
    }
    postComment(slug,comment):Observable<any>{
      return this.apiService.post('/articles/'+slug+'/comments',{comment})
      .map(
        data=>{
          return data;
        }
      )
    }
    editArticle(slug):Observable<any>{
      return this.apiService.put('/articles/'+slug)
      .map(
        data=>{
          return data;
        }
      )
    }
    deleteArticle(slug):Observable<any>{
      return this.apiService.delete('/articles/'+slug)
      .map(
        data=>{
          return data;
        }
      )
    }
    favorite(slug): Observable<Article> {
      return this.apiService.post('/articles/' + slug + '/favorite');
    }
    unfavorite(slug): Observable<Article> {
      return this.apiService.delete('/articles/' + slug + '/favorite');
    }
  }