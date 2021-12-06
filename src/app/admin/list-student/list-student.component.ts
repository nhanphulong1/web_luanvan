import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PaymentComponent } from 'src/app/form/payment/payment.component';
import { CourseService } from 'src/app/Services/course.service';
import { StudentService } from 'src/app/Services/student.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.scss']
})
export class ListStudentComponent implements OnInit {
  displayedColumns: string[] = ['id', 'stu_code', 'stu_name', 'stu_email', 'stu_gender', 'stu_phone', 'stu_birthday', 'cou_name', 'cla_code', 'cla_name', 'cla_course', 'pay_type', 're_result', 'action'];
  dataSource = new MatTableDataSource();
  courseData;
  name = "";
  cou_id = "";
  type = "-1";

  constructor(
    private service: StudentService,
    private course: CourseService,
    public dialog: MatDialog
  ) { }

  @ViewChild(MatPaginator, {static: false})
  set paginator(value: MatPaginator) {
    if (this.dataSource){
      this.dataSource.paginator = value;
    }
  }  
  
  @ViewChild(MatSort, {static: false})
  set sort(value: MatSort) {
    if (this.dataSource){
      this.dataSource.sort = value;
    }
  }

  ngOnInit(): void {
    this.service.getAllStudent().subscribe((result) => {
      this.dataSource = new MatTableDataSource(result.data);
    });
    this.course.getAllCourse().subscribe((result)=>{
      this.courseData = result.data;
    })
  }

  loadTable() {
    this.service.getAllStudent().subscribe((result) => {
      this.dataSource = new MatTableDataSource(result.data);
    });
  }

  onSearch() {
    var data = {
      'type': this.type,
      'name': this.name,
      'cou_id': this.cou_id
    };
    this.service.searchStudent(data).subscribe((result) => {
      this.dataSource = new MatTableDataSource(result.data);
    })
  }

  openPayment(id){
    const dialogRef = this.dialog.open(PaymentComponent, {
      width: '850px',
      data: {stu_id: id}
    });
    dialogRef.afterClosed().subscribe((result)=>{
      this.loadTable();
  })
  }

  deleteStudent(id) {
    Swal.fire({
      title: 'Xóa học viên?',
      text: "Bạn có muốn xóa học viên này!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xóa'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteStudent(id).subscribe((result) => {
          console.log(result);
          if (result.status == 1) {
            Swal.fire(
              'Deleted!',
              'Xóa học viên thành công!',
              'success'
            );
            this.loadTable();
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Lỗi!!!',
              text: 'Xóa học viên thất bại.',
            })
          }
        })
      }
    })
  }


}
