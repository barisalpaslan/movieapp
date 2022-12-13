import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { AuthComponent } from "./auth.component";
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations:[
    AuthComponent
  ],
  imports : [
    FormsModule,
    RouterModule.forChild([
      {
        path:"", component:AuthComponent
      }
    ]),
    SharedModule
  ],
  exports:[

  ]
})
export class AuthModule{

}
