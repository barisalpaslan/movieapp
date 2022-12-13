import { SharedModule } from './../shared/shared.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgModule } from "@angular/core";
import { CategoryCreateComponent } from "./category-create/category-create.component";
import { CategoryComponent } from "./category.component";
import { AuthGuard } from '../auth/auth.guard';



@NgModule({
  declarations : [
    CategoryComponent,
    CategoryCreateComponent
  ],
  imports : [
    FormsModule,
    RouterModule.forChild([
      {
        path:"categories/create", component:CategoryCreateComponent, canActivate:[AuthGuard]
      }
    ]),
    SharedModule
  ],
  exports:[
    CategoryComponent,
    CategoryCreateComponent
  ],
})
export class CategoriesModule{

}
