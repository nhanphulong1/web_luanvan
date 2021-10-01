import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-front-header',
  templateUrl: './front-header.component.html',
  styleUrls: ['./front-header.component.scss']
})
export class FrontHeaderComponent implements OnInit {

  constructor(private auth: AuthService) {
    if(this.auth.isLoggedIn()){
      this.isLogin = true;
    }else{
      this.isLogin = false;
    }
   }

  public isLogin = false;
  data = '';

  ngOnInit(): void {
    this.isLogin = this.auth.isLoggedIn();
    this.data = this.auth.getInfo();
    console.log(this.data);
  }


  Login(){
    this.auth.login('home');
  }

  logOut(){
    this.auth.logout();
  }

}
