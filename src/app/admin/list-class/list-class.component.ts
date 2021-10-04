import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ClassService } from 'src/app/Services/class.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-class',
  templateUrl: './list-class.component.html',
  styleUrls: ['./list-class.component.scss']
})
export class ListClassComponent implements OnInit {

  displayedColumns: string[] = ['id', 'email', 'name', 'type', 'action'];
  dataSource = new MatTableDataSource();

  constructor(
    private service: ClassService
  ) { }

  @ViewChild(MatSort) set matSort(sort: MatSort) {
    if (!this.dataSource.sort) {
      this.dataSource.sort = sort;
    }
  }

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;


  ngOnInit(): void {
    this.service.getAllClass().subscribe((result) => {
      this.dataSource = new MatTableDataSource(result.data);
    });
  }

  
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator; // For pagination
  }

  loadTable(){
    this.service.getAllClass().subscribe((result) => {
      this.dataSource = new MatTableDataSource(result.data);
    });
  }

  // onSearch() {
  //   var data = {
  //     'email': this.email,
  //     'name': this.name,
  //     'type': this.type
  //   };
  //   console.log(data);
  //   this.service.searchUser(data).subscribe((result) => {
  //     console.log(result);
  //     this.dataSource = new MatTableDataSource(result.data);
  //   })
  // }

  // deleteUser(id) {
  //   Swal.fire({
  //     title: 'Xóa tài khoản?',
  //     text: "Bạn có muốn xóa tài khoản này!",
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Xóa'
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       this.service.deleteUser(id).subscribe((result) => {
  //         console.log(result);
  //         if (result.status == 1) {
  //           Swal.fire(
  //             'Deleted!',
  //             'Xóa tài khoản thành công!',
  //             'success'
  //           );
  //           this.loadTable();
  //         } else {
  //           Swal.fire({
  //             icon: 'error',
  //             title: 'Lỗi!!!',
  //             text: 'Xóa tài khoản thất bại.',
  //           })
  //         }
  //       })
  //     }
  //   })
  // }

}
