import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { ServeHttpService } from 'src/app/Services/serve-http.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private router: Router,
    private service: ServeHttpService,
  ) { }

  data;
  id;

  ngOnInit(): void {
    this.id = this.auth.getInfo();
    this.service.getUserById(this.id).subscribe((result)=>{
      this.data = result.data[0];
    })
  }

  logOut(){
    this.auth.logout();
    this.router.navigate(['/admin/login']);
  }

}
