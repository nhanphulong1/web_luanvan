import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  constructor(
    private auth: AuthService
  ) { }

  permission;
  type;

  ngOnInit(): void {
    this.permission = this.auth.getPermission();
    this.type = this.auth.getType();
  }

  show = 0;

  checkPermission(per){
    if(per == 0 && this.type != 2){
      return false;
    }
    return this.permission.includes(per) || this.type == 2;
  }

  showNav(temp){
    if(this.show == temp){
      this.show=0;
    }else{
      this.show= temp;
    }
  }

}
