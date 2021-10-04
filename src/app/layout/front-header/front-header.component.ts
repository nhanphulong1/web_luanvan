import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { ServeHttpService } from 'src/app/Services/serve-http.service';

@Component({
  selector: 'app-front-header',
  templateUrl: './front-header.component.html',
  styleUrls: ['./front-header.component.scss']
})
export class FrontHeaderComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private service: ServeHttpService,  
  ) {
    // if(this.auth.isLoggedIn()){
    //   this.isLogin = true;
    // }else{
    //   this.isLogin = false;
    // }
   }

  public isLogin = false;
  data;
  id;

  ngOnInit(): void {
    this.isLogin = this.auth.isLoggedIn();
    this.auth.getLoggedInName.subscribe(() => this.setLogin());
    if(this.isLogin){
      this.id = this.auth.getInfo();
      this.service.getUserById(this.id).subscribe((result)=>{
        this.data = result.data[0];
      })
    }
  }

  setLogin(){
    this.isLogin = this.auth.isLoggedIn();
    if(this.isLogin){
      this.id = this.auth.getInfo();
      this.service.getUserById(this.id).subscribe((result)=>{
        this.data = result.data[0];
      })
    }
  }

  Login(){
    this.auth.login('home');
    this.isLogin = this.auth.isLoggedIn();
  }

  logOut(){
    this.auth.logout();
    this.isLogin = false;
  }

}
