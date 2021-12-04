import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';
import { AuthService } from 'src/app/Services/auth.service';
import { ClassService } from 'src/app/Services/class.service';
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
    private classService: ClassService,
  ) {
    // if(this.auth.isLoggedIn()){
    //   this.isLogin = true;
    // }else{
    //   this.isLogin = false;
    // }
   }

  public isLogin = false;
  data;
  user;
  dataClass;

  ngOnInit(): void {
    this.isLogin = this.auth.isLoggedIn();
    this.auth.getLoggedInName.subscribe(() => this.setLogin());
    if(this.isLogin){
      this.user = this.auth.getInfo();
      this.service.getUserById(this.user).subscribe((result)=>{
        this.data = result.data[0];
        if(this.data.type == 0){
          this.getClass(this.data.stu_id);
        }
      });
      
    }
  }

  setLogin(){
    this.isLogin = this.auth.isLoggedIn();
    if(this.isLogin){
      this.user = this.auth.getInfo();
      this.service.getUserById(this.user).subscribe((result)=>{
        this.data = result.data[0];
      })
    }
  }

  getClass(id){
    this.classService.getAllClassByStudent(id).subscribe(result => {
      this.dataClass = result.data.filter(element => element.cla_status == 0)[0];
    });
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
