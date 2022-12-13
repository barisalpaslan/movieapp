import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthResponse } from './auth-response.model';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],

})
export class AuthComponent implements OnInit{

  isLoginMode : boolean= false;
  loading : boolean =false;
  error:string;

  constructor(private authService : AuthService, private router :Router){}

  ngOnInit(): void {

  }
  closeDialog(){
    this.error=null;
  }

  onToggleMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form:NgForm){
    if(form.invalid){
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    this.loading = true;

    let authResponse : Observable<AuthResponse>;

    if(this.isLoginMode){
      authResponse =  this.authService.signIn(email,password)
    }
    else {
      authResponse = this.authService.signUp(email,password)
    }

    authResponse.subscribe(response=> {
      this.loading = false;
      this.router.navigate(["/movies"]);
    }, err => {
      this.error = err;
      this.loading = false;
    })

    form.reset();
  }
}
