import { Pipe, PipeTransform } from "@angular/core";

@Pipe({   //angular core'dan gelir
  name:"summary"
})


export class SummaryPipe implements PipeTransform{

  transform(value:string, limit?:number){     //soru işareti = isteğe bağlı,değer göndermez zorunda dğeiliz
          if(!value ) return null;

          limit = limit? limit:10;     // eğer html dosyasında summary için herhangi bir değer belirtmezsek
                                       // otomatik olarak burada verilen değeri kullanır.

          if(limit>value.length){
            return value;
          }
          return value.substring(0,limit) + "....";
}
}
