import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Errors, UserService, ApiService } from '../../../shared';
import 'rxjs/add/observable/throw';
@Component({
  selector: 'user-authform',
  templateUrl: './user-authform.component.html',
  styleUrls: ['./user-authform.component.css']
})
export class UserAuthformComponent implements OnInit {
  token: string = '';
  authType: String = '';
  title: String = '';
  errors: Errors = {errors: {}};
  isSubmitting: boolean = false;
  authForm : FormGroup= new FormGroup({
    'email': new FormControl('',Validators.required),
    'password': new FormControl('',Validators.required)
  });
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
  }
  ngOnInit() {
    this.route.url.subscribe(params => {
      this.authType = params[params.length - 1].path;
      this.title = (this.authType === 'login') ? 'Sign in' : 'Sign up';
      if (this.authType === 'register') {
        this.authForm.addControl('username', new FormControl('',Validators.required));
      }
    });
  }
  submitForm() {
    this.errors = {errors: {}};
    this.isSubmitting = true;
    let credentials = this.authForm.value;
    this.userService.attemptAuth(this.authType, credentials)
    .subscribe(
      data => { 
        this.router.navigateByUrl('/');
      },
      error => {
        this.errors = error;
        console.log(error);
        this.isSubmitting = false;
      }
    );
  }
}
