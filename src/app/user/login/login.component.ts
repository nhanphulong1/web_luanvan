import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthdataService } from 'src/app/Services/authdata.service';
// import * as internal from 'stream';

export interface DialogData {
  email: string;
  password: string;
  token: string;
  status: boolean;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  constructor(
    private authdataService: AuthdataService,
    public dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit(): void {
    console.log(this.data);
  }

  submitLogin(): void {
    // console.log('DialogLoginComponent', this.data);
    // this.dialogRef.close({ data: this.data });
    this.authdataService
      .authLogin(this.data.email, this.data.password)
      .subscribe(
        (data) => {
          // console.log('DialogLoginComponent: login, data = ', data);
          if (Object.prototype.hasOwnProperty.call(data, 'error')) {
            // console.log('DialogLoginComponent: login: error', data);
          } else {
            this.data.token = data;
            // console.log('DialogLoginComponent: this.data', this.data);
            this.dialogRef.close({ data: this.data });
          }
        },
        (error) => {
          console.log('AuthService: failed', error);
        }
      );
  }

}
