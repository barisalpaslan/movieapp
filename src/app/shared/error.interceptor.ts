import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";



export class ErrorInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    return next.handle(req).pipe(
      catchError((response : HttpErrorResponse) => {
        let message = "hata oluştu";

        if(!navigator.onLine){
          message = "İnternet bağlantınız yok.";
          return throwError(message);
        }

        if(response.error.error){
          if(response.status === 401){
            message = "yetkiniz yok";
            console.log(message);
            return throwError(message);
          }
        }

        if(response.error.error){
          switch(response.error.error.message){
           case "EMAIL_EXISTS":
            message = "Mail adresi daha önceden kullanılmış";
            break;

           case "EMAIL_NOT_FOUND":
            message = "Mail adresi bulunamadı";
            break;

           case "INVALID_PASSWORD":
            message = "Parola geçersiz";
            break;
          }
        }

        return throwError(message);
      })
    )
  }
}
