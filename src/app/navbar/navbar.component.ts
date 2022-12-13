import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isAuthenticated: boolean = false;

  constructor(private authService : AuthService){}

  ngOnInit(): void {
    this.authService.user.subscribe(user => {
     this.isAuthenticated = !user ? false :true ;
    })
    //Eğer AuthServer'dan bir user gelmeyecekse isAuthenticated
    //false olur, bir user gelmişse de, yani giriş-kayıt yapılmışsa
    //değişken true olur.

  }

  onLogout(){
    this.authService.logout();
  }

}
