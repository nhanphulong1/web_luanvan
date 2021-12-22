import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { ClassService } from 'src/app/Services/class.service';
import { CourseService } from 'src/app/Services/course.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-class',
  templateUrl: './list-class.component.html',
  styleUrls: ['./list-class.component.scss']
})
export class ListClassComponent implements OnInit {

  displayedColumns: string[] = ['id', 'cla_code', 'cla_name', 'cou_name', 'tea_name', 'cla_course', 'cla_start', 'cla_number','cla_admission', 'cla_status', 'action'];
  dataSource = new MatTableDataSource();
  courseData = [];
  tea_name='';
  cou_id='';
  nowDate = moment(new Date).format('YYYY-MM-DD');
  cla_course='';


  constructor(
    private service: ClassService,
    private course: CourseService,
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
    this.service.getAllClass().subscribe((result) => {
      this.dataSource = new MatTableDataSource(result.data);
    });
    this.course.getAllCourse().subscribe((result)=>{
      this.courseData = result.data;
    })
  }

  loadTable(){
    this.service.getAllClass().subscribe((result) => {
      this.dataSource = new MatTableDataSource(result.data);
    });
  }

  onSearch() {
    var data = {
      'tea_name': this.tea_name,
      'cou_id': this.cou_id,
      'cla_course': this.cla_course,
    };
    this.service.searchClass(data).subscribe((result) => {
      this.dataSource = new MatTableDataSource(result.data);
    })
  }

  updateStatus(id){
    Swal.fire({
      title: 'Hoàn thành lớp học?',
      text: "Bạn có muốn cập nhật trạng thái lớp học này!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Cập nhật',
      cancelButtonText: 'Hủy'
    }).then((result) => {
      if (result.isConfirmed) {
        var data = { 'cla_status': 1 };
        this.service.updateStatus(id, data).subscribe((result) => {
          console.log(result);
          if (result.status == 1) {
            Swal.fire(
              'Thành công!',
              'Cập nhật trạng thái lớp học thành công!',
              'success'
            );
            this.loadTable();
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Lỗi!!!',
              text: 'Cập nhật trạng thái lớp học thất bại.',
            })
          }
        })
      }
    })
  }

  deleteClass(id) {
    Swal.fire({
      title: 'Xóa lớp học?',
      text: "Bạn có muốn xóa lớp học này!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(id);
        this.service.deleteClass(id).subscribe((result) => {
          console.log(result);
          if (result.status == 1) {
            Swal.fire(
              'Thành công!',
              'Xóa lớp học thành công!',
              'success'
            );
            this.loadTable();
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Lỗi!!!',
              text: 'Xóa lớp học thất bại.',
            })
          }
        })
      }
    })
  }

}
