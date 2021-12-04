import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DialogResultComponent } from 'src/app/form/dialog-result/dialog-result.component';
import { ExamStudentService } from 'src/app/Services/exam-student.service';
import { ExamService } from 'src/app/Services/exam.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-detail-exam',
    templateUrl: './detail-exam.component.html',
    styleUrls: ['./detail-exam.component.scss']
})
export class DetailExamComponent implements OnInit {

    displayedColumns: string[] = ['id', 'stu_code', 'stu_name', 'stu_email', 'stu_gender', 'stu_phone', 'cla_code', 'cla_name', 'cla_course', 'tea_name', 're_result', 'action'];
    dataSource = new MatTableDataSource();
    id;
    data;
    dataStudent;
    newStudent = [];
    check: Boolean=false;
    check1: Boolean=true;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private exam: ExamService,
        private student: ExamStudentService,
        private dialog: MatDialog,
    ) { }

    @ViewChild(MatSort) set matSort(sort: MatSort) {
        if (!this.dataSource.sort) {
            this.dataSource.sort = sort;
        }
    }

    @ViewChild(MatPaginator, { static: false })
    set paginator(value: MatPaginator) {
        if (this.dataSource) {
            this.dataSource.paginator = value;
        }
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe((params: ParamMap) => {
            this.id = params.get('id');
        });
        this.exam.getExamsById(this.id).subscribe((result) => {
            this.data = result.data[0];
            if(new Date(this.data.ex_date) <= new Date()){
                this.check = true;
            }
        });
        this.student.getStudentByExams(this.id).subscribe((result) => {
            this.dataStudent = result.data;
            this.dataSource = new MatTableDataSource(this.dataStudent);
        });
    }

    async getStudent(id) {
        let kq = await this.student.getStudentByCourse(id).toPromise();
        let arr = kq.data;
        if(arr.length >0){
            kq.data.forEach(element => {
                if(this.check1){
                    this.dataStudent.push(element);
                    this.newStudent.push(element);
                }
            });
            this.check1 = false;
        }
        this.dataSource = new MatTableDataSource(this.dataStudent);
    }

    async createStudentExam(id) {
        let data = {
            ex_id: id,
            arrStudent: this.newStudent
        };
        Swal.fire({
            title: 'Xác nhận?',
            text: "Bạn có muốn xác nhận cập nhật danh sách học viên ở dưới!",
            icon: 'question',
            showCancelButton: true,
            reverseButtons: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#9A9483',
            confirmButtonText: 'Xác nhận'
        }).then(async (result) => {
            if (result.isConfirmed) {
                let kq = await this.student.createExamStudent(data).toPromise();
                if (kq.status == 1) {
                    Swal.fire({
                        icon: 'success',
                        text: "Cập nhật danh sách học viên thi bằng lái thành công!",
                        timer: 2000
                    })
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Lỗi',
                        text: "Cập nhật danh sách học viên thi bằng lái thất bại!"
                    })
                }
            }
        })
    }

    updateResult(id){
        const dialogRef = this.dialog.open(DialogResultComponent, {
            width: '550px',
            data: {es_id: id}
        });
    }

}
