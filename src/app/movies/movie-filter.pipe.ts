import { Movie } from './movie.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'movieFilter'
})
export class MovieFilterPipe implements PipeTransform {

  transform(movies : Movie[] , filterText:string):Movie[]{
       filterText = filterText.toLowerCase();

       //ya filtrelenmiş şeklini geri döndürecek, ya da filtrelenmemiş halini ( : movies )
       //eğer bize -1 dönmüyorsa, yani filter işleminde bize bir film dönüyorsa filterText'in çalışacağını belirttik
       return filterText? movies.filter
        (
        (m:Movie) => m.title.toLowerCase().indexOf(filterText) !== -1 ||
        m.description.toLowerCase().indexOf(filterText) !== -1
        ) : movies;
  }
}
