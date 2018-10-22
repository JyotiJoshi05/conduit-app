import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ArticleService,Errors} from '../../../shared';
import { Router } from '@angular/router';
@Component({
  selector: 'create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.css']
})
export class CreateCommentComponent implements OnInit {
  errors: Errors = new Errors();
  slug:string;
  createCommentForm : FormGroup= new FormGroup({
    'body': new FormControl('',Validators.required)
  });
  constructor(private articleService:ArticleService,private router:Router) { }

  ngOnInit() {
  }
  postComment(){
    let comment = this.createCommentForm.value;
    this.slug = this.articleService.clickedArt.slug;
    this.articleService.postComment(this.slug,comment)
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
