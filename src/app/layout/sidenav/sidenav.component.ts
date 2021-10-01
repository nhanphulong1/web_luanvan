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

  showUser = true;
  showStudent = false;
  showClass = false;
  showTeacher = false;
  showCourse = false;
  showStatistic = false;

}
