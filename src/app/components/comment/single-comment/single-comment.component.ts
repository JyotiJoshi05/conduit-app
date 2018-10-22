import { Component, OnInit,Input } from '@angular/core';
import { Errors,UserService, User, Comment, ArticleService } from 'src/app/shared';
import { Router, ActivatedRoute,ParamMap } from '@angular/router';

@Component({
  selector: 'single-comment',
  templateUrl: './single-comment.component.html',
  styleUrls: ['./single-comment.component.css']
})
export class SingleCommentComponent implements OnInit {
  @Input() comment:Comment;
  currentUser: User;
  slug:string;
  auth:boolean= false;
  errors: Errors = new Errors();
  constructor(private userService:UserService,private articleService: ArticleService,private router:Router,private active:ActivatedRoute) { }

  ngOnInit() {
    this.active.paramMap.subscribe( (params: ParamMap) =>{
      this.slug = (params.get('slug'));
    });
    this.userService.currentUser.subscribe(
      (userData) => {
        this.currentUser = userData;
      }
    ); 
    if(this.comment.author.username === this.currentUser.username)
    {
      this.auth = true;
    }
  }
  deleteComment(commentId){
    this.articleService.deleteComment(this.slug,commentId)
    .subscribe(
      data => { 
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
        this.router.navigate(['article', this.slug]));
      },
      error => {
        this.errors = error;
      }
    );
  }

}
