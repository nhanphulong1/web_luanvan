import { Component, NgZone, OnInit } from '@angular/core';
import { ServeHttpService } from 'src/app/Services/serve-http.service';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-verify',
    templateUrl: './verify.component.html',
    styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {

    phoneNumber: any;
    reCaptchaVerifier!: any;
    code!: any;
    verify: any = JSON.parse(localStorage.getItem('verificationId') || '{}');
    id: any;
    err = true;
    isLogin = false;
    data;
    public form = this.fb.group({
        code: ['', Validators.required]
    })

    config = {
        allowNumbersOnly: true,
        length: 6,
        isPasswordInput: false,
        disableAutoFocus: false,
        placeholder: '',
        inputStyles: {
            width: '50px',
            height: '50px',
        },
    };


    constructor(
        private router: Router,
        private ngZone: NgZone,
        private auth: AuthService,
        private service: ServeHttpService,
        private fb: FormBuilder,
    ) { }

    ngOnInit() {
        this.isLogin = this.auth.isLoggedIn();
        if (!this.isLogin)
            this.router.navigate(['home']);
        this.id = this.auth.getInfo();
        this.getData();
        firebase.initializeApp(environment.firebase);
    }

    async getData() {
        let dataAccount = await this.service.getUserById(this.id).toPromise();
        console.log(dataAccount);
        this.data = dataAccount.data[0];
        if (this.data.type == 0) {
            this.phoneNumber = '+84' + this.data.stu_phone.slice(1);
        } else {
            this.phoneNumber = '+84' + this.data.tea_phone.slice(1);
        }
        // this.getOTP();
    }


    getOTP() {
        this.reCaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
            size: 'invisible',
        });
        console.log(this.reCaptchaVerifier);

        console.log(this.phoneNumber);
        firebase
            .auth()
            .signInWithPhoneNumber(this.phoneNumber, this.reCaptchaVerifier)
            .then((confirmationResult) => {
                localStorage.setItem(
                    'verificationId',
                    JSON.stringify(confirmationResult.verificationId)
                );
                this.verify = JSON.parse(localStorage.getItem('verificationId') || '{}');
            })
            .catch((error) => {
                console.log(error);
                alert(error)
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            });
    }

    handleClick() {
        var credential = firebase.auth.PhoneAuthProvider.credential(
            this.verify,
            this.form.value.code
        );
        firebase
            .auth()
            .signInWithCredential(credential)
            .then((response) => {
                this.authen();
            })
            .catch((error) => {
                this.form.controls['code'].setErrors({ valid: false });
            });
    }

    async authen(){
        let data = {
            user: this.id
        }
        let result = await this.service.authenUser(data).toPromise();
        if(result.status == 1){
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Xác thực tài khoản thành công',
                showConfirmButton: false,
                timer: 1500
              }).then(()=>{
                this.ngZone.run(() => {
                    this.router.navigate(['/front/detail']);
                });
              })
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Thất bại',
                text: 'Xác thực tài khoản thất bại. Vui lòng thử lại sau!',
              })
        }
        
    }

}
