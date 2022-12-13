import { SharedModule } from './../shared/shared.module';
import { CategoriesModule } from './../category/categories.module';
import { MoviesRoutingModule } from './movies-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";
import { MovieCreateComponent } from "./movie-create/movie-create.component";
import { MovieDetailsComponent } from "./movie-details/movie-details.component";
import { MovieFilterPipe } from "./movie-filter.pipe";
import { MovieComponent } from "./movie/movie.component";
import { MoviesHomeComponent } from "./movies-home/movies-home.component";
import { MoviesComponent } from "./movies.component";
import { SummaryPipe } from "./summary.pipe";

@NgModule({
     declarations : [
      MoviesComponent,
      MovieComponent,
      MovieDetailsComponent,
      MovieFilterPipe,
      SummaryPipe,
      MovieCreateComponent,
      MoviesHomeComponent
     ],
     imports : [
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        MoviesRoutingModule,
        CategoriesModule,
        SharedModule
     ],
     exports : [
      MoviesComponent,
      MovieComponent,
      MovieDetailsComponent,
      MovieFilterPipe,
      SummaryPipe,
      MovieCreateComponent,
      MoviesHomeComponent
     ]
})
export class MoviesModule{

}
