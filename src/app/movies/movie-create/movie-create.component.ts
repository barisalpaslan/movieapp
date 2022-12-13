import { AlertifyService } from '../../shared/alertify.service';
import { MovieService } from '../movie.service';
import { Category } from '../../category/category.model';
import { CategoryService } from '../../category/category.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-movie-create',
  templateUrl: './movie-create.component.html',
  styleUrls: ['./movie-create.component.css'],
  providers: [CategoryService, MovieService]
})
export class MovieCreateComponent implements OnInit{

  categories: Category[];
  model:any = {
    categoryId : ""
  };


  constructor(private categoryService :CategoryService,
    private movieService:MovieService,
    private router:Router,
    private alertify : AlertifyService){}

  ngOnInit(): void {
   this.categoryService.getCategories().subscribe(data=>{
    this.categories = data;
   })
  }

  movieForm = new FormGroup({              //form bazında kontrol yapıyoruz
    id : new FormControl("", [Validators.required]),
    title : new FormControl("", [Validators.required, Validators.minLength(5)]),
    description : new FormControl("", [Validators.required]),
    imageUrl : new FormControl("", [Validators.required]),
    categoryId : new FormControl("", [Validators.required])
  })

  get title(){
    return this.movieForm.get("title");
  }

  clearForm(){
    this.movieForm.patchValue({
      id:"",
      title:"",
      description:"",
      imageUrl:"",
      categoryId:"",
    })
  }


  createMovie(){


      //  if(title.value === "" || description.value == "" || imageUrl.value == "" || categoryId.value == "-1"){
      //     this.alertify.error("Tüm alanları doldurmalısınız.");
      //     return;
      //  }

      //  if(title.value.length < 5) {
      //   this.alertify.error("Title için min.  karakter girilmeli");
      //   return;
      //  }

      //  const extensions = ["jpeg","jpg","png"];
      //  const extension = imageUrl.value.split('.').pop();

      // if(extensions.indexOf(extension) == -1){
      //    this.alertify.error("Sadece jp, jpeg ve png uzantısı girebilirsiniz.")
      //    return;
      // }

          // template-driven bazında kontrol yapılırsa bunlar yazılıyor
      const movie = {
                       id:0,
                       title:this.movieForm.value.title,
                       description:this.movieForm.value.description,
                       imageUrl:'assets/img/' + this.movieForm.value.imageUrl,
                       isPopular:false,
                       datePublished:new Date().getTime(),
                       categoryId:this.movieForm.value.categoryId,
                  };

                  this.movieService.createMovie(movie).subscribe(data=>
                    {
                      console.log(data);
                      this.router.navigate(["/movies"])
                    }
                  );
  }

  log(value:any){
    console.log(value);
  }

}
