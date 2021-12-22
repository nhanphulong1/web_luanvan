import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Web';
  isFront = true;
  isBack = false;
  constructor(
    private router: Router
  ){}

  ngOnInit(){
    // console.log(this.router);
  }
  
  onActivate(elementRef) {
    // console.log(this.router.url.includes('front'));
    if(this.router.url.includes('front') || this.router.url.includes('home')){
      // console.log('1');
      this.isFront = true;
    }else if(this.router.url.includes('admin/login')){
      // console.log('2');
      this.isFront=false;
      this.isBack=false;
    }else if(this.router.url.includes('admin')){
      // console.log('3');
      this.isBack=true;
      this.isFront=false;
    }else{
      // console.log('4');
      this.isFront = false;
      this.isBack=false;
    }
    // console.log(this.isFront);
  }

}
