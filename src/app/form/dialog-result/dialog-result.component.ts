import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ResultService } from 'src/app/Services/result.service';
import { DialogData } from 'src/app/user/login/login.component';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-dialog-result',
    templateUrl: './dialog-result.component.html',
    styleUrls: ['./dialog-result.component.scss']
})
export class DialogResultComponent implements OnInit {

    constructor(
        private fb: FormBuilder,
        private service: ResultService,
        public dialogRef: MatDialogRef<DialogResultComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) { }

    public formResult = this.fb.group({
        es_id: [this.data['es_id'], Validators.required],
        re_theory: ['', [Validators.required, Validators.min(0)]],
        re_theoryTotal: ['', [Validators.required, Validators.min(0)]],
        re_theoryResult: [1, Validators.required],
        re_practice: ['', [Validators.required, Validators.min(0)]],
        re_practiceTotal: ['',[Validators.required, Validators.min(0)]],
        re_practiceResult: [1, Validators.required],
        re_result: [1, Validators.required],
    });

    dataResult;
    update = false;

    ngOnInit(): void {
        this.service.getResultById(this.data['es_id']).subscribe((result) => {
            this.dataResult = result.data[0];
            if (result.data.length > 0) {
                this.setValue();
                this.update = true;
            }
            console.log(result, this.update);
            
        })
    }

    setValue() {
        this.formResult.controls['re_theory'].setValue(this.dataResult.re_theory);
        this.formResult.controls['re_theoryTotal'].setValue(this.dataResult.re_theoryTotal);
        this.formResult.controls['re_theoryResult'].setValue(this.dataResult.re_theoryResult);
        this.formResult.controls['re_practice'].setValue(this.dataResult.re_practice);
        this.formResult.controls['re_practiceTotal'].setValue(this.dataResult.re_practiceTotal);
        this.formResult.controls['re_practiceResult'].setValue(this.dataResult.re_practiceResult);
        this.formResult.controls['re_result'].setValue(this.dataResult.re_result);
    }


    onSubmit() {
        console.log(this.formResult.valid);
        if(this.formResult.valid)
            if (this.update == true) {
                this.updateResult();
            } else {
                this.createResult();
            }
    }

    updateResult() {
        this.service.updateResult(this.data['es_id'], this.formResult.value).subscribe((result)=>{
            if(result.status == 1){
                Swal.fire(
                    'Success!',
                    'Cập nhật kết quả thành công!',
                    'success'
                ).then(()=>{
                    this.onNoClick();
                });
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Cập nhật kết quả thất bại.',
                }).then(()=>{
                    this.onNoClick();
                });
            }
        })
    }

    createResult() {
        this.service.createResult(this.formResult.value).subscribe((result)=>{
            if(result.status == 1){
                Swal.fire(
                    'Success!',
                    'Cập nhật kết quả thành công!',
                    'success'
                ).then(()=>{
                    this.onNoClick();
                });
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Cập nhật kết quả thất bại.',
                }).then(()=>{
                    this.onNoClick();
                });
            }
        })
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

}
