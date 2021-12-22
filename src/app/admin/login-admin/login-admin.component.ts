import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/Services/auth.service';
import { AuthdataService } from 'src/app/Services/authdata.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-login-admin',
    templateUrl: './login-admin.component.html',
    styleUrls: ['./login-admin.component.scss']
})
export class LoginAdminComponent implements OnInit {

    constructor(
        private auth: AuthService,
        private authdataService: AuthdataService,
        private router: Router
    ) { }

    ngOnInit(): void {
        if (this.auth.isLoggedIn()) {
            this.router.navigate(['admin/user']);
        }
    }

    public email;
    public password;
    public dangnhap = true;

    submitLogin(): void {
        this.authdataService
            .authLogin(this.email, this.password)
            .subscribe(
                (data) => {
                    if (Object.prototype.hasOwnProperty.call(data, 'error')) {
                    } else {
                        if (data?.status == 0 && data?.message == "Invalid email or password!") {
                            this.dangnhap = false;
                        } else if(data?.status == 1){
                            this.auth.setToken(data.token);
                            this.router.navigate(['/admin/trangchu']);
                            // window.location.reload();
                        }else if(data?.status == 2){
                            Swal.fire({
                                text: 'Tài khoản của bạn đã bị khóa!',
                                icon: 'warning'
                            })
                        }else{
                            this.dangnhap = false;
                        }
                    }
                },
                (error) => {
                    console.log('AuthService: failed', error);
                }
            );
    }

}
