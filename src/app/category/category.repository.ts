import { Category } from './category.model';

export class CategoryRepository{

  private categories:Category[];

  constructor(){
    this.categories = [
    {id:1,categoryName:"macera"},
    {id:2,categoryName:"romantik"},
    {id:3,categoryName:"dram"},
    {id:4,categoryName:"bilimkurgu"},
    ]
  }

  getCategories():Category []{
    return this.categories;
}


}
