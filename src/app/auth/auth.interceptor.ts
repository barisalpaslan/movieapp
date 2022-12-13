import { AuthService } from './auth.service';
import { HttpHandler, HttpParams } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { HttpInterceptor } from '@angular/common/http';
import { exhaustMap, take } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

  constructor(private authService: AuthService){}

  intercept(req : HttpRequest<any>, next: HttpHandler){

    return this.authService.user.pipe(
      take(1),                                 //user bilgisini getirir
      exhaustMap(user => {
        if(!user){
          return next.handle(req);
        }
        const updatedRequest = req.clone({
          params : new HttpParams().set('auth', user.token)
        })
        return next.handle(updatedRequest);
      })
    )

  }
}
