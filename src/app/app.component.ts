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
  constructor(
    private router: Router
  ){}

  ngOnInit(){
    console.log(this.router);
  }
  
  onActivate(elementRef) {
    // console.log(this.router.url.includes('front'));
    if(this.router.url.includes('front') || this.router.url.includes('home')){
      this.isFront = true;
    }else{
      this.isFront = false;
    }
  }

}
