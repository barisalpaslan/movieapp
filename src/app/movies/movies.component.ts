import { MovieService } from './movie.service';
import { AlertifyService } from '../shared/alertify.service';
import { Movie } from './movie.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
  providers:[MovieService]
})
export class MoviesComponent implements OnInit{

  movies:Movie[] = [];
  // movieRepository:MovieRepository;

  //popularMovies:Movie[];
  FilteredMovies : Movie[] = [];

  title = "Film Listesi";

  filterText :string = "";

  error:any;

  loading:boolean = false;

  userId: string;

  movieList: string[] = [];

   constructor(private alertify: AlertifyService,
               private movieService:MovieService,
               private activatedRoute : ActivatedRoute,
               private authService : AuthService){
  //   this.movieRepository = new MovieRepository();
  //   this.movies = this.movieRepository.getMovies();
  //   this.popularMovies = this.movieRepository.getPopularMovies();
   }

   ngOnInit(): void {
    this.authService.user.subscribe(user => {
      if(user){
        this.userId = user.id

      this.activatedRoute.params.subscribe(params => {

        this.loading = true;

        this.movieService.getMovies(params["categoryId"]).subscribe(data=>{
          this.movies = data;
          this.FilteredMovies = this.movies;

          this.movieService.getList(this.userId).subscribe(data => {
            this.movieList = data;
          })
          this.loading = false;
        },error =>
        {
          this.error = error;
          this.loading = false;
        });
      })
      }
    });
   }


   getButtonState(movie:Movie){
    return this.movieList.findIndex(m=>m === movie.id) > -1
   }



   onInputChange(){
        this.FilteredMovies = this.filterText?
          this.movies.filter(m=>m.title.toLowerCase().indexOf(this.filterText) !== -1
                             || m.description.toLowerCase().indexOf(this.filterText) !== -1) : this.movies
   }

   addToList($event:any ,movie:Movie){
        if($event.target.classList.contains("btn-primary")){
          $event.target.innerText = "Listeden Çıkar";
          $event.target.classList.remove("btn-primary");
          $event.target.classList.add("btn-danger");

          this.movieService.addToMyList({ userId : this.userId , movieId: movie.id})
                           .subscribe(() =>  this.alertify.success(movie.title + " listeye eklendi."));

        }
        else{
          $event.target.innerText = "Listeye Ekle";
          $event.target.classList.remove("btn-danger");
          $event.target.classList.add("btn-primary");

          this.movieService.removeFromList({userId:this.userId , movieId : movie.id})
                            .subscribe(()=> this.alertify.error(movie.title + " listeden çıkarıldı."));

        }
   }
}
