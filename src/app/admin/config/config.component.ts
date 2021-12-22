import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ConfigService } from 'src/app/Services/config.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-config',
    templateUrl: './config.component.html',
    styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {

    constructor(
        private fb: FormBuilder,
        private config: ConfigService,
    ) { }

    type = true;

    formConfig = this.fb.group({
        c_name : ['', Validators.required],
        c_email : ['', Validators.required],
        c_pass: ['', Validators.required],
        c_address : ['', Validators.required],
        c_phone : ['', Validators.required],
        c_facebook : ['', Validators.required]
    });

    ngOnInit(): void {
        this.config.getConfig().subscribe((result)=>{
            console.log(result);
            this.loadValue(result.data);
        })
    }

    loadValue(data){
        this.formConfig.controls['c_name'].setValue(data.c_name);
        this.formConfig.controls['c_email'].setValue(data.c_email);
        this.formConfig.controls['c_pass'].setValue(data.c_pass);
        this.formConfig.controls['c_address'].setValue(data.c_address);
        this.formConfig.controls['c_phone'].setValue(data.c_phone);
        this.formConfig.controls['c_facebook'].setValue(data.c_facebook);
    }

    async onSubmit(){
        if(this.formConfig.valid){
            let kq = await this.config.updateConfig(this.formConfig.value).toPromise();
            if(kq.status == 1){
                Swal.fire({
                    icon: 'success',
                    text: 'Cập nhật thông tin thành công!',
                    timer: 2000
                });
            }else{
                Swal.fire({
                    icon: 'error',
                    text: 'Lỗi. Cập nhật thông tin thất bại!',
                    timer: 2000
                });
            }
        }
    }

    showPass(){
        this.type = !this.type;
    }

}
