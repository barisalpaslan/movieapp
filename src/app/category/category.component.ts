import { CategoryService } from './category.service';
import { CategoryRepository } from './category.repository';
import { Category } from './category.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  providers:[CategoryService]
})
export class CategoryComponent implements OnInit {

  categories:Category[] = [];
  // categoryRepository:CategoryRepository;
  selectedCategory: Category = null;;

 constructor(private categoryService : CategoryService){}

 ngOnInit(): void {
  this.categoryService.getCategories().subscribe(data => {
    this.categories = data;
  });
 }

 displayAll = true;

 selectCategory(category?:Category){
  if(category)
  {
    this.selectedCategory = category;
    this.displayAll = false;
  }
  else{
    this.selectedCategory = null;
    this.displayAll = true;
  }
 }


}
