import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CourseService } from 'src/app/Services/course.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-course',
  templateUrl: './list-course.component.html',
  styleUrls: ['./list-course.component.scss']
})
export class ListCourseComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'price', 'training', 'action'];
  dataSource = new MatTableDataSource();

  constructor(
    private service: CourseService
  ) { }

  @ViewChild(MatSort) set matSort(sort: MatSort) {
    if (!this.dataSource.sort) {
      this.dataSource.sort = sort;
    }
  }

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  ngOnInit(): void {
    this.service.getAllCourse().subscribe((result) => {
      console.log(result.data);
      this.dataSource = new MatTableDataSource(result.data);
    });
  }

  // ngAfterViewInit(): void {
  //   this.dataSource.paginator = this.paginator; // For pagination
  // }

  loadTable(){
    this.service.getAllCourse().subscribe((result) => {
      this.dataSource = new MatTableDataSource(result.data);
    });
  }

  deleteCourse(id) {
    Swal.fire({
      title: 'Xóa khóa học?',
      text: "Bạn có muốn xóa khóa học này!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteCourse(id).subscribe((result) => {
          if (result.status == 1) {
            Swal.fire(
              'Thành công!',
              'Xóa khóa học thành công!',
              'success'
            );
            this.loadTable();
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Lỗi!!!',
              text: 'Bạn phải xóa tất cả các lớp học thuộc khóa học này!.',
            })
          }
        })
      }
    })
  }
}
