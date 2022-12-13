import { MyList } from './mylist.model';
import { Movie } from './movie.model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { catchError, delay, map, Observable, tap, throwError } from 'rxjs';

@Injectable()
export class MovieService {
    url = "http://localhost:3000/movies";
    url_firebase ="https://angular-movie-app-3a8ff-default-rtdb.firebaseio.com/";

    constructor(private http:HttpClient){}

    getMovies(categoryId : any): Observable<Movie[]>{

    // let newUrl = this.url_firebase + "movies.json";

    // if(categoryId){
    //   newUrl += '?categoryId=' + categoryId;
    // }

      return this.http.get<Movie[]>(this.url_firebase + "movies.json").pipe(
        map(response => {
          const movies : Movie[] = [];

          for(const key in response){
            if(categoryId){     //eklenen verinin categoryId'siyle aynı kategoride filmi listeler
              if(categoryId == response[key].categoryId){
                movies.push({...response[key],id:key});
              }
            }
            else
            {
              movies.push({...response[key],id:key}); //Tüm Kategoriler sayfasında listeler
            }
          }
          return movies;
        }),
        tap(data => console.log(data)),
        catchError(this.handleError),
        delay(300)
        );
    }

    private handleError(error: HttpErrorResponse){
      if(error.error instanceof ErrorEvent)
      {
        //client tarafıyla yada network ile alakalı bir hata varsa
        console.log("error" + error.error.message);
      }
      else{
        //backend tarafıyla alakalı bir hata varsa
        switch(error.status){
          case 404:
            console.log("not found");
            break;
          case 403:
            console.log("acccess denied");
            break;
          case 500:
            console.log("interval error"); // server hatası
            break;
          default:
            console.log("bilinmeyen hata")
        }
      }
         return throwError("Bir hata oluştu.");
    }


    getMovieById(movieId:any):Observable<Movie>{
      return this.http.get<Movie>(this.url_firebase + "movies/" + movieId + '.json').pipe(
        tap(data => console.log(data)),
        catchError(this.handleError),
        delay(300)
      );
    }

    createMovie(movie:Movie):Observable<Movie>{

      const httpOptions = {
        headers : new HttpHeaders({            //header içerisinde token gönderilir,örn: üye olan kullanıcıya yetki vermek için
          "Content-Type":"application/json",  // burda token oluşacak, oluşan tokene göre API bize yetki verecek.
          "Authorization":"Token"
        })
      }
      return this.http.post<Movie>(this.url_firebase + "/movies.json", movie, httpOptions).pipe(
        tap(data => console.log(data)),
        catchError(this.handleError)   //hata yakalamak adına pipe da eklenir.
      )
    }

    addToMyList(item: MyList):Observable<MyList>{   //users collection'u oluşturacak,
        return this.http.post<MyList>(this.url_firebase + "/users/" + item.userId + "/list/" + item.movieId + ".json",
        {
           dateAdded : new Date().getTime()
        }).pipe(
          tap(data=>console.log(data)),
          catchError(this.handleError)
        )
    }

    removeFromList(item: MyList): Observable<MyList>{
      return this.http.delete<MyList>(this.url_firebase + "/users/" + item.userId + "/list/" + item.movieId + ".json")
      .pipe(
        tap(data => console.log(data)),
        catchError(this.handleError)
      )
    }


    getList(userId : string) : Observable<string[]>{
      return this.http.get<string[]>(this.url_firebase  + "/users/" + userId + "/list.json" )
      .pipe(
        map(response => {
          const movies : string[] = [];

          for(const key in response ){
            movies.push(key);
          }
          return movies;
        }),
        tap(data => console.log(data)),
        catchError(this.handleError)
      )
    }
}
