import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { AuthService } from 'src/app/Services/auth.service';
import { PaymentService } from 'src/app/Services/payment.service';
import { StudentService } from 'src/app/Services/student.service';
import { DialogData } from 'src/app/user/login/login.component';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-payment',
    templateUrl: './payment.component.html',
    styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

    constructor(
        private fb: FormBuilder,
        private service: PaymentService,
        private student: StudentService,
        private auth: AuthService,
        public dialogRef: MatDialogRef<PaymentComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) { }


    now = moment(new Date()).format("YYYY-MM-DDTHH:mm");
    public formPayment = this.fb.group({
        de_id: ['', Validators.required],
        pay_type: ['-1', Validators.required],
        pay_date: [null, Validators.required],
        pay_id: ['']
    });

    info;
    update = false;

    ngOnInit(): void {
        this.student.getStudentById(this.data['stu_id']).subscribe((result) => {
            this.info = result.data[0];
            if (this.info.pay_type != null) {
                this.update = true;
                this.loadPayment();
            } else {
                this.formPayment.controls['pay_date'].setValue(this.now);
            }
            this.formPayment.controls['de_id'].setValue(this.info.de_id);
        })
    }

    loadPayment() {
        this.formPayment.controls['pay_date'].setValue(moment(this.info.pay_date).format("YYYY-MM-DDTHH:mm"));
        this.formPayment.controls['pay_type'].setValue(this.info.pay_type);
        this.formPayment.controls['pay_id'].setValue(this.info.pay_id);
        this.formPayment.controls['de_id'].setValue(this.info.de_id);
    }

    onSubmit(){
        if(this.formPayment.value.pay_type == -1){
            this.deletePayment();
        }else if(this.update == false){
            this.createPayment();
        }else{
            this.updatePayment();
        }
    }

    async createPayment(){
        let dataReq = this.formPayment.value;
        dataReq.user_id = this.auth.getInfo();
        let kq = await this.service.createPayment(dataReq).toPromise();
        console.log(kq);
        if(kq.status == 1){
            Swal.fire({
                icon:'success',
                text: 'Cập nhật thanh toán thành công!',
                timer: 2000
            }).then(()=>{
                this.dialogRef.close();
            })
        }else{
            Swal.fire({
                icon: 'error',
                text: 'Cập nhật thanh toán thất bại!'
            });
        }
    }

    async updatePayment(){
        let dataReq = this.formPayment.value;
        dataReq.user_id = this.auth.getInfo();
        let kq = await this.service.updatePayment(dataReq.de_id,dataReq).toPromise();
        if(kq.status == 1){
            Swal.fire({
                icon:'success',
                text: 'Cập nhật thanh toán thành công!',
                timer: 2000
            }).then(()=>{
                this.dialogRef.close();
            })
        }else{
            Swal.fire({
                icon: 'error',
                text: 'Cập nhật thanh toán thất bại!'
            });
        }
    }

    async deletePayment(){
        let kq = await this.service.deletePayment(this.info.de_id).toPromise();
        if(kq.status == 1){
            Swal.fire({
                icon:'success',
                text: 'Cập nhật thanh toán thành công!',
                timer: 2000
            }).then(()=>{
                this.dialogRef.close();
            })
        }else{
            Swal.fire({
                icon: 'error',
                text: 'Cập nhật thanh toán thất bại!'
            });
        }
    }

}
