import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ServeHttpService } from 'src/app/Services/serve-http.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {
  displayedColumns: string[] = ['id', 'email', 'name', 'type', 'action'];
  dataSource = new MatTableDataSource();
  email = "";
  name = "";
  type = 3;

  constructor(
    private service: ServeHttpService
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
    this.service.getAllUser().subscribe((result) => {
      this.dataSource = new MatTableDataSource(result.data);
    });
  }

  // ngAfterViewInit(): void {
  //   this.dataSource.paginator = this.paginator; // For pagination
  // }

  loadTable(){
    this.service.getAllUser().subscribe((result) => {
      this.dataSource = new MatTableDataSource(result.data);
    });
  }

  onSearch() {
    var data = {
      'email': this.email,
      'name': this.name,
      'type': this.type
    };
    console.log(data);
    this.service.searchUser(data).subscribe((result) => {
      console.log(result);
      this.dataSource = new MatTableDataSource(result.data);
    })
  }

  resetPassUser(id){
    Swal.fire({
      title: 'Đặt lại mật khẩu?',
      text: "Bạn có muốn đặt lại mật khẩu cho tài khoản này!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đặt lại'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.resetPassUser(id).subscribe((result) => {
          console.log(result);
          if (result.status == 1) {
            Swal.fire(
              'Success!',
              'Đặt lại mật khẩu tài khoản thành công!',
              'success'
            );
            this.loadTable();
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Lỗi!!!',
              text: 'Hành động thất bại! Vui lòng thử lại.',
            })
          }
        })
      }
    })
  }

  deleteUser(id) {
    Swal.fire({
      title: 'Xóa tài khoản?',
      text: "Bạn có muốn xóa tài khoản này!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xóa'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteUser(id).subscribe((result) => {
          console.log(result);
          if (result.status == 1) {
            Swal.fire(
              'Deleted!',
              'Xóa tài khoản thành công!',
              'success'
            );
            this.loadTable();
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Lỗi!!!',
              text: 'Xóa tài khoản thất bại.',
            })
          }
        })
      }
    })
  }
}
