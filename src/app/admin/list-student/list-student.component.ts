import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StudentService } from 'src/app/Services/student.service';
import Swal from 'sweetalert2';
// import { DialogRegisClassComponent } from '../dialog-regis-class/dialog-regis-class.component';

@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.scss']
})
export class ListStudentComponent implements OnInit {
  displayedColumns: string[] = ['id', 'stu_code','stu_name', 'stu_email', 'stu_image', 'stu_phone', 'stu_address', 'action'];
  dataSource = new MatTableDataSource();
  name = "";
  stu_code = "";
  phone = "";

  constructor(
    private service: StudentService,
    public dialog: MatDialog
  ) { }

  @ViewChild(MatSort) set matSort(sort: MatSort) {
    if (!this.dataSource.sort) {
      this.dataSource.sort = sort;
    }
  }

  @ViewChild(MatPaginator, {static: false})
  set paginator(value: MatPaginator) {
    if (this.dataSource){
      this.dataSource.paginator = value;
    }
  }

  ngOnInit(): void {
    this.service.getAllStudent().subscribe((result) => {
      this.dataSource = new MatTableDataSource(result.data);
    });
  }

  loadTable(){
    this.service.getAllStudent().subscribe((result) => {
      this.dataSource = new MatTableDataSource(result.data);
    });
  }

  onSearch() {
    var data = {
      'phone': this.phone,
      'name': this.name,
      'stu_code': this.stu_code
    };
    this.service.searchStudent(data).subscribe((result) => {
      this.dataSource = new MatTableDataSource(result.data);
    })
  }
  
  // openDialog(id){
  //   console.log(id);
  //   var dialogRef = this.dialog.open(DialogRegisClassComponent, {
  //     width: '550px',
  //     data: {stu_id: id}
  //   });
  // }

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
