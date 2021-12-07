import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClassService } from 'src/app/Services/class.service';
import { DialogData } from 'src/app/user/login/login.component';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-add-exams',
    templateUrl: './add-exams.component.html',
    styleUrls: ['./add-exams.component.scss']
})
export class AddExamsComponent implements OnInit {

    constructor(
        private fb: FormBuilder,
        private classService: ClassService,
        public dialogRef: MatDialogRef<AddExamsComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) { }

    formExam = this.fb.group({
        cla_id: ['', Validators.required]
    })

    classData;

    ngOnInit(): void {
        this.classService.getAllClassByCourse(this.data['cou_id']).subscribe((kq)=>{
            this.classData = kq.data.filter(element => element.cla_status == 1);
        });
    }

    onSubmit(){
        if(this.formExam.valid){
            Swal.fire({
                text: "Bạn xác nhận thêm học viên của lớp này!",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Xác nhận'
              }).then((result) => {
                if (result.isConfirmed) {
                        this.dialogRef.close(this.formExam.value.cla_id);
                }
              });
        }
    }

}
