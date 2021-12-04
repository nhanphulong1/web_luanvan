import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { ServeHttpService } from 'src/app/Services/serve-http.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-chang-pass',
    templateUrl: './chang-pass.component.html',
    styleUrls: ['./chang-pass.component.scss']
})
export class ChangPassComponent implements OnInit {

    constructor(
        private auth: AuthService,
        private service: ServeHttpService,
        private fb: FormBuilder,
        private router: Router,
    ) { }

    public formChange = this.fb.group({
        'oldPass': ['', Validators.required],
        'newPass': ['', [Validators.required, Validators.pattern("[0-9a-zA-Z]{6}[0-9a-zA-Z]*")]],
        'RenewPass': ['', Validators.required],
    });
    user;

    ngOnInit(): void {
        let user = this.auth.getInfo();
        this.user = user;
    }

    async onSubmit() {
        if (this.formChange.valid) {
            let data = {
                'user': this.user,
                'password': this.formChange.value.oldPass
            }
            let checkPass = await this.service.checkPass(data).toPromise();
            console.log(checkPass);
            let checkNewPass = (this.formChange.value.newPass == this.formChange.value.RenewPass);
            if (checkNewPass == false) {
                this.formChange.controls['RenewPass'].setErrors({ 'unvalid': true })
            }
            if (checkPass.valid == 1 && checkNewPass) {
                let dataUpdate = {
                    'user': this.user,
                    'password': this.formChange.value.newPass
                }
                this.service.updatePassUser(dataUpdate).subscribe((result) => {
                    if (result.status == 1) {
                        Swal.fire(
                            'Thành công!',
                            'Thay đổi mật khẩu thành công!',
                            'success'
                        ).then(() => {
                            this.auth.logout();
                            this.auth.login('front/detail');
                        }
                        )
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Thất bại',
                            text: 'Thay đổi mật khẩu thất bại!',
                        })
                    }
                })
            } else if (checkPass.valid == 0) {
                this.formChange.controls['oldPass'].setErrors({ 'unvalid': true })
            }
        }

    }

}
