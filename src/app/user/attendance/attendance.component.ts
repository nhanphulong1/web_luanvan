import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AttendanceService } from 'src/app/Services/attendance.service';
import { AuthService } from 'src/app/Services/auth.service';
import { DiariesService } from 'src/app/Services/diaries.service';
import { ClassService } from 'src/app/Services/class.service';
import { ServeHttpService } from 'src/app/Services/serve-http.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { CommentComponent } from '../comment/comment.component';

@Component({
    selector: 'app-attendance',
    templateUrl: './attendance.component.html',
    styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {

    constructor(
        private route: ActivatedRoute,
        private diaries: DiariesService,
        private auth: AuthService,
        private service: ServeHttpService,
        private classService: ClassService,
        private attendance: AttendanceService,
        private router: Router,
        private dialog: MatDialog,
    ) { }

    di_id;
    cla_id;
    data;
    studentId;
    cla_name;
    type;
    status;

    ngOnInit(): void {
        this.type = this.auth.getType(); 
        this.route.paramMap.subscribe((params: ParamMap) => {
            this.di_id = params.get('id');
        });
        this.getAttendance();
    }

    async getAttendance(){
        let stu_code = this.auth.getInfo();
        let student = await this.service.getUserById(stu_code).toPromise();
        this.studentId = student.data[0].stu_id;
        let diary = await this.diaries.getDiariesById(this.di_id).toPromise();
        this.data = diary.data[0];
        this.cla_id = this.data.cla_id;
        let classData = await this.classService.getClassById(this.cla_id).toPromise();
        this.cla_name = classData.data[0].cla_name;
        let atten = await this.attendance.getDiariesByStudent(this.studentId,this.di_id).toPromise();
        if(atten.data.length > 0){
            this.status = 1;
        }else{
            this.status = 0;
        }
    }

    onSubmit(){
        const dialogRef = this.dialog.open(CommentComponent,{
            width: '550px'
        })

        dialogRef.afterClosed().subscribe((result)=>{
            if(result != 'false'){
                let data = {
                    stu_id: this.studentId,
                    di_id: this.di_id,
                    att_comment: result.comment,
                };
                this.createAttendance(data);
            }
        });
    }

    async createAttendance(data){
        let result = await this.attendance.createAttendance(data).toPromise();
        if(result.status == 1){
            Swal.fire({
                icon: 'success',
                text:'Điểm danh thành công!'
            }).then(()=>{
                this.router.navigate(['/front/class/'+this.cla_id]);
            })
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Lỗi',
                text:'Điểm danh thất bại!'
            })
        }
    }

}
