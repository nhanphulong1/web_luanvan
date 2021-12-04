import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ExamComponent } from 'src/app/form/exam/exam.component';
import { CourseService } from 'src/app/Services/course.service';
import { ExamService } from 'src/app/Services/exam.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-list-exam',
    templateUrl: './list-exam.component.html',
    styleUrls: ['./list-exam.component.scss']
})
export class ListExamComponent implements OnInit {

    constructor(
        private exam: ExamService,
        private course: CourseService,
        private dialog: MatDialog,
    ) { }

    displayedColumns: string[] = ['id', 'cou_name', 'ex_date', 'ex_location', 'action'];
    dataSource = new MatTableDataSource();
    data;
    courseData;
    cou_id = '';
    ex_date = null;
    ex_location = '';

    ngOnInit(): void {
        this.exam.getAllExams().subscribe((result)=>{
            this.data = result.data;
            this.dataSource = new MatTableDataSource(this.data);
        });
        this.course.getAllCourse().subscribe((result)=>{
            this.courseData = result.data;
        })
    }
    
    openExam(ex_id){
        const dialogRef = this.dialog.open(ExamComponent, {
            width: '550px',
            data: {ex_id: ex_id}
        });
        dialogRef.afterClosed().subscribe((result)=>{
            this.exam.getAllExams().subscribe((result)=>{
                this.data = result.data;
                this.dataSource = new MatTableDataSource(this.data);
            })
        })
    }

    async onSearch(){
        let data = {
            cou_id: this.cou_id,
            ex_date: this.ex_date,
            ex_location: this.ex_location
        };
        let kq = await this.exam.searchExams(data).toPromise();
        this.data = kq.data;
        this.dataSource = new MatTableDataSource(this.data);
    }

    async loadTable(){
        let kq = await this.exam.getAllExams().toPromise();
        this.data = kq.data;
        this.dataSource = new MatTableDataSource(this.data);
    }

    async deleteExam(id){
        Swal.fire({
            title: 'Xóa lịch thi?',
            text: "Bạn có muốn xóa lịch thi lái xe này!",
            icon: 'warning',
            showCancelButton: true,
            reverseButtons: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#9A948',
            cancelButtonText: 'Hủy',
            confirmButtonText: 'Xóa'
          }).then((result) => {
            if (result.isConfirmed) {
              this.exam.deleteExams(id).subscribe((result) => {
                if (result.status == 1) {
                  Swal.fire(
                    'Success!',
                    'Xóa lịch thi thành công!',
                    'success'
                  );
                  this.loadTable();
                } else {
                  Swal.fire({
                    icon: 'error',
                    title: 'Lỗi!!!',
                    text: 'Xóa lịch thi thất bại.',
                  })
                }
              })
            }
          })
    }

}
