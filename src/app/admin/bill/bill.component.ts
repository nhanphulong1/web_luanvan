import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StudentService } from 'src/app/Services/student.service';
import { DialogData } from 'src/app/user/login/login.component';
import { ConfigService } from 'src/app/Services/config.service';

@Component({
    selector: 'app-bill',
    templateUrl: './bill.component.html',
    styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit {

    dataStudent;
    name;
    address;

    constructor(
        private student: StudentService,
        private config: ConfigService,
        public dialogRef: MatDialogRef<BillComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) { }

    

    ngOnInit(): void {
        this.loadData();
        this.config.getConfig().subscribe((result)=>{
            this.name = result.data.c_name;
            this.address = result.data.c_address;
        })
    }

    async loadData(){
        let data = await this.student.getStudentById(this.data['stu_id']).toPromise();
        this.dataStudent = data.data[0];
        console.log(this.dataStudent);
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

}
