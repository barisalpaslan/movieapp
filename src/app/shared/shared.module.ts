import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import { AlertComponent } from './alert/alert.component';
import { NgModule } from "@angular/core";

@NgModule({
  declarations:[
    AlertComponent,
    LoadingComponent
  ],
  imports:[
    CommonModule
  ],
  exports:[
    AlertComponent,
    LoadingComponent,
    CommonModule
  ]
})
export class SharedModule{

}
