import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { CourseService } from 'src/app/Services/course.service';
import { ExamService } from 'src/app/Services/exam.service';
import { DialogData } from 'src/app/user/login/login.component';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-exam',
    templateUrl: './exam.component.html',
    styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements OnInit {

    constructor(
        private fb: FormBuilder,
        private exam: ExamService,
        private course: CourseService,
        public dialogRef: MatDialogRef<ExamComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) { }

    public formExam = this.fb.group({
        cou_id: ['', Validators.required],
        ex_date: [null, Validators.required],
        ex_location: ['', Validators.required],
    });

    dataExam;
    dataCourse;
    update = false;
    now = moment(new Date()).format("YYYY-MM-DD");

    ngOnInit(): void {
        this.course.getAllCourse().subscribe((kq)=>{
            this.dataCourse = kq.data;
            if(this.data['ex_id'] == null){
                this.formExam.controls['cou_id'].setValue(kq.data[0].cou_id);
                this.formExam.controls['ex_date'].setValue(this.now);
            }else{
                this.setValue();
                this.update = true;
            }
        });
        console.log(this.data['ex_id']);
    }

    async setValue(){
        let kq = await this.exam.getExamsById(this.data['ex_id']).toPromise();
        this.dataExam = kq.data[0];
        this.formExam.controls['cou_id'].setValue(this.dataExam.cou_id);
        this.formExam.controls['ex_date'].setValue(moment(this.dataExam.ex_date).format("YYYY-MM-DD"));
        this.formExam.controls['ex_location'].setValue(this.dataExam.ex_location);
    }

    onSubmit() {
        if(this.formExam.valid)
            if (this.update == true) {
                this.updateResult();
            } else {
                this.createResult();
            }
    }

    updateResult() {
        this.exam.updateExams(this.data['ex_id'], this.formExam.value).subscribe((result)=>{
            if(result.status == 1){
                Swal.fire(
                    'Thành công!',
                    'Cập nhật kết quả thành công!',
                    'success'
                ).then(()=>{
                    this.onNoClick();
                });
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi!',
                    text: 'Cập nhật kết quả thất bại.',
                }).then(()=>{
                    this.onNoClick();
                });
            }
        })
    }

    checkDate(){
        let date1 = new Date(this.formExam.value.ex_date+ ' 23:59:59');
        let date2 = new Date();
        if(date1<date2 && !this.update){
            this.formExam.controls['ex_date'].setErrors({min: true});
        }
    }

    createResult() {
        this.checkDate();
        this.exam.createExams(this.formExam.value).subscribe((result)=>{
            if(result.status == 1){
                Swal.fire(
                    'Thành công!',
                    'Cập nhật kết quả thành công!',
                    'success'
                ).then(()=>{
                    this.onNoClick();
                });
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi!',
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
