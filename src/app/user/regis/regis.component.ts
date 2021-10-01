import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-regis',
  templateUrl: './regis.component.html',
  styleUrls: ['./regis.component.scss']
})
export class RegisComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.logout();
  }


}
