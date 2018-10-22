import { Component, OnInit,Input } from '@angular/core';
import { Comment } from 'src/app/shared';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})

export class CommentsComponent {
  @Input() comments:Array<Comment>;
  
  constructor() { }
  
}
