import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PermissionComponent } from 'src/app/form/permission/permission.component';
import { ServeHttpService } from 'src/app/Services/serve-http.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-list-user',
    templateUrl: './list-user.component.html',
    styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {
    displayedColumns: string[] = ['id', 'user', 'name', 'type', 'isDelete','action'];
    dataSource = new MatTableDataSource();
    email = "";
    name = "";
    type = 3;

    constructor(
        private service: ServeHttpService,
        public dialog: MatDialog,
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
        this.service.getAllUser().subscribe((result) => {
            this.dataSource = new MatTableDataSource(result.data);
        });
    }

    // ngAfterViewInit(): void {
    //   this.dataSource.paginator = this.paginator; // For pagination
    // }

    loadTable() {
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

    onPermission(id){
        const dialogRef = this.dialog.open(PermissionComponent, {
            width: '450px',
            data: {id: id}
        });
    }

    resetPassUser(id) {
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

    clockUser(id) {
        Swal.fire({
            title: 'Khóa tài khoản?',
            text: "Bạn có muốn khóa tài khoản này!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Khóa tài khoản'
        }).then((result) => {
            if (result.isConfirmed) {
                this.service.deleteUser(id).subscribe((result) => {
                    if (result.status == 1) {
                        Swal.fire(
                            'Thành công!',
                            'Khóa tài khoản thành công!',
                            'success'
                        );
                        this.loadTable();
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Lỗi!!!',
                            text: 'Khóa tài khoản thất bại.',
                        })
                    }
                })
            }
        })
    }

    unclockUser(id) {
        Swal.fire({
            title: 'Mở khóa tài khoản?',
            text: "Bạn có muốn mở khóa tài khoản này!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Mở khóa'
        }).then((result) => {
            if (result.isConfirmed) {
                this.service.undeleteUser(id).subscribe((result) => {
                    if (result.status == 1) {
                        Swal.fire(
                            'Thành công!',
                            'Mở khóa tài khoản thành công!',
                            'success'
                        );
                        this.loadTable();
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Lỗi!!!',
                            text: 'Mở khóa tài khoản thất bại.',
                        })
                    }
                })
            }
        })
    }
}
