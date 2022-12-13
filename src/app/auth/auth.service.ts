import { Router } from '@angular/router';
import { User } from './user.model';
import { catchError, throwError, tap, Observable, Subject, BehaviorSubject } from 'rxjs';
import { AuthResponse } from './auth-response.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn : "root"
})

export class AuthService {

  api_key = "AIzaSyCJkgQDXvePiKFz2jzepc5eBkZUeNes9bE"
  user = new BehaviorSubject<User>(null);

  constructor(private http:HttpClient, private router:Router) { }

  signUp(email:string, password:string){
     return this.http.post<AuthResponse>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + this.api_key, {
        email: email,
        password : password,
        returnSecureToken : true
    }).pipe(
      tap(response => {
        this.handleAuthentication(response.email,response.localId,response.idToken, +response.expiresIn)
      })
    )
  }

  signIn(email:string, password : string){
      return this.http.post<AuthResponse>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + this.api_key, {
        email: email,
        password : password,
        returnSecureToken : true
     }).pipe(
      tap(response => {
        //  const expirationDate = new Date(new Date().getTime() + (+response.expiresIn * 1000))

        // const user = new User(
        //   response.email,
        //   response.localId,
        //   response.idToken,
        //   expirationDate
        // );

        // this.user.next(user);c
        this.handleAuthentication(response.email,response.localId,response.idToken, +response.expiresIn)
      })
    )
  }

  logout(){
    this.user.next(null);
    localStorage.removeItem("user");
    this.router.navigate(["/auth"]);
  }

  autoLogin(){
    const user =JSON.parse(localStorage.getItem("user"));

    if(!user){
      return;
    }

    const loadedUser = new User(
      user.email,
      user.id,
      user._token,
      new Date(user._tokenExpirationDate)
    );

    if(loadedUser.token){
      this.user.next(loadedUser);
    }

  }

  handleAuthentication(email :string,userId:string, token:string, expiresIn:number){
    const expirationDate = new Date(new Date().getTime() + (expiresIn * 1000))

    const user = new User(
      email,
      userId,
      token,
      expirationDate
    );

    this.user.next(user);  //veriyi okumak için next

    localStorage.setItem("user", JSON.stringify(user));

  }

}


