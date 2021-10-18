import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  // showUser = true;
  // showStudent = false;
  // showClass = false;
  // showTeacher = false;
  // showCourse = false;
  // showStatistic = false;
  show = 0;

  showNav(temp){
    if(this.show == temp){
      this.show=0;
    }else{
      this.show= temp;
    }
  }

}
