import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ServeHttpService } from 'src/app/Services/serve-http.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-regis',
  templateUrl: './list-regis.component.html',
  styleUrls: ['./list-regis.component.scss']
})
export class ListRegisComponent implements OnInit {
  displayedColumns: string[] = ['id', 'res_name', 'res_email','res_phone', 'res_type', 'res_status', 'action'];
  dataSource = new MatTableDataSource();
  status = 2;
  name = "";
  type = 'all';

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
    this.service.getAllRegis().subscribe((result) => {
      this.dataSource = new MatTableDataSource(result.data);
    });
  }

  loadTable(){
    this.service.getAllRegis().subscribe((result) => {
      this.dataSource = new MatTableDataSource(result.data);
    });
  }

  onSearch() {
    var data = {
      'status': this.status,
      'name': this.name,
      'type': this.type
    };
    this.service.searchRegis(data).subscribe((result) => {
      console.log(result);
      
      this.dataSource = new MatTableDataSource(result.data);
    })
  }

  updateRegis(id){
    this.service.updateRegis(id).subscribe((result)=>{
      this.loadTable();
      if(result.status == 1){
        Swal.fire(
          'Success!',
          'cập nhật thành công!',
          'success'
        );
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Lỗi!!!',
          text: 'Cập nhật thất bại.',
        })
      }
    })
    
  }
  
  // deleteTeacher(id) {
  //   Swal.fire({
  //     title: 'Xóa giáo viên?',
  //     text: "Bạn có muốn xóa giáo viên này!",
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Xóa'
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       this.service.deleteTeacher(id).subscribe((result) => {
  //         console.log(result);
  //         if (result.status == 1) {
  //           Swal.fire(
  //             'Deleted!',
  //             'Xóa giáo viên thành công!',
  //             'success'
  //           );
  //           this.loadTable();
  //         } else {
  //           Swal.fire({
  //             icon: 'error',
  //             title: 'Lỗi!!!',
  //             text: 'Xóa giáo viên thất bại.',
  //           })
  //         }
  //       })
  //     }
  //   })
  // }

}
