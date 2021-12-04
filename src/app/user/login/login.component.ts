import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthdataService } from 'src/app/Services/authdata.service';
// import * as internal from 'stream';

export interface DialogData {
    user: string;
    password: string;
    token: string;
    status: number;
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
        // console.log(this.data);
    }

    submitLogin(): void {
        this.authdataService
            .authLogin(this.data.user, this.data.password)
            .subscribe(
                (data) => {
                    if (Object.prototype.hasOwnProperty.call(data, 'error')) {
                        // console.log('DialogLoginComponent: login: error', data);
                    } else {
                        this.data.token = data;
                        this.dialogRef.close({ data: this.data });
                    }
                },
                (error) => {
                    console.log('AuthService: failed', error);
                }
            );
    }

}
