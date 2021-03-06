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
            title: '??????t la??i m????t kh????u?',
            text: "Ba??n co?? mu????n ??????t la??i m????t kh????u cho ta??i khoa??n na??y!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '??????t la??i',
            cancelButtonText: 'Hu??y'
        }).then((result) => {
            if (result.isConfirmed) {
                this.service.resetPassUser(id).subscribe((result) => {
                    console.log(result);
                    if (result.status == 1) {
                        Swal.fire(
                            'Tha??nh c??ng!',
                            '??????t la??i m????t kh????u ta??i khoa??n tha??nh c??ng!',
                            'success'
                        );
                        this.loadTable();
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'L????i!!!',
                            text: 'Ha??nh ??????ng th????t ba??i! Vui lo??ng th???? la??i.',
                        })
                    }
                })
            }
        })
    }

    clockUser(id) {
        Swal.fire({
            title: 'Kho??a ta??i khoa??n?',
            text: "Ba??n co?? mu????n kho??a ta??i khoa??n na??y!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Kho??a ta??i khoa??n',
            cancelButtonText: 'Hu??y'
        }).then((result) => {
            if (result.isConfirmed) {
                this.service.deleteUser(id).subscribe((result) => {
                    if (result.status == 1) {
                        Swal.fire(
                            'Tha??nh c??ng!',
                            'Kho??a ta??i khoa??n tha??nh c??ng!',
                            'success'
                        );
                        this.loadTable();
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'L????i!!!',
                            text: 'Kho??a ta??i khoa??n th????t ba??i.',
                        })
                    }
                })
            }
        })
    }

    unclockUser(id) {
        Swal.fire({
            title: 'M???? kho??a ta??i khoa??n?',
            text: "Ba??n co?? mu????n m???? kho??a ta??i khoa??n na??y!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'M???? kho??a',
            cancelButtonText: 'Hu??y'
        }).then((result) => {
            if (result.isConfirmed) {
                this.service.undeleteUser(id).subscribe((result) => {
                    if (result.status == 1) {
                        Swal.fire(
                            'Tha??nh c??ng!',
                            'M???? kho??a ta??i khoa??n tha??nh c??ng!',
                            'success'
                        );
                        this.loadTable();
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'L????i!!!',
                            text: 'M???? kho??a ta??i khoa??n th????t ba??i.',
                        })
                    }
                })
            }
        })
    }
}
