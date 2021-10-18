import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TeacherService } from 'src/app/Services/teacher.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-teacher',
  templateUrl: './list-teacher.component.html',
  styleUrls: ['./list-teacher.component.scss']
})
export class ListTeacherComponent implements OnInit {
  displayedColumns: string[] = ['id', 'tea_code','tea_name', 'tea_email','tea_image', 'tea_phone', 'cla_status', 'action'];
  dataSource = new MatTableDataSource();
  email = "";
  name = "";
  type = 3;

  constructor(
    private service: TeacherService
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
    this.service.getAllTeacher().subscribe((result) => {
      this.dataSource = new MatTableDataSource(result.data);
      console.log(result.data);
    });
  }

  // ngAfterViewInit(): void {
  //   this.dataSource.paginator = this.paginator; // For pagination
  // }

  loadTable(){
    this.service.getAllTeacher().subscribe((result) => {
      this.dataSource = new MatTableDataSource(result.data);
    });
  }

  onSearch() {
    var data = {
      'email': this.email,
      'name': this.name,
      'type': this.type
    };
    this.service.searchTeacher(data).subscribe((result) => {
      this.dataSource = new MatTableDataSource(result.data);
    })
  }


  
  deleteTeacher(id) {
    Swal.fire({
      title: 'Xóa giáo viên?',
      text: "Bạn có muốn xóa giáo viên này!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xóa'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteTeacher(id).subscribe((result) => {
          console.log(result);
          if (result.status == 1) {
            Swal.fire(
              'Deleted!',
              'Xóa giáo viên thành công!',
              'success'
            );
            this.loadTable();
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Lỗi!!!',
              text: 'Xóa giáo viên thất bại.',
            })
          }
        })
      }
    })
  }

}
