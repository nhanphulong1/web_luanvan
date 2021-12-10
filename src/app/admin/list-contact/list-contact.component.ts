import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ServeHttpService } from 'src/app/Services/serve-http.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-list-contact',
    templateUrl: './list-contact.component.html',
    styleUrls: ['./list-contact.component.scss']
})
export class ListContactComponent implements OnInit {

    displayedColumns: string[] = ['con_id', 'con_new','con_email', 'con_title', 'action'];
    dataSource = new MatTableDataSource();
    email = "";
    name = "";
    type = 3;

    constructor(
        private service: ServeHttpService,
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
        this.service.getContact().subscribe((result) => {
            this.dataSource = new MatTableDataSource(result.data);
        })
    }

    loadTable() {
        this.service.getContact().subscribe((result) => {
            this.dataSource = new MatTableDataSource(result.data);
        });
    }

    deleteContact(id) {
        Swal.fire({
            title: 'Xóa liên hệ?',
            text: "Bạn có muốn xóa liên hệ này!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Hủy'
        }).then((result) => {
            if (result.isConfirmed) {
                this.service.deleteContact(id).subscribe((result) => {
                    console.log(result);
                    if (result.status == 1) {
                        Swal.fire(
                            'Thành công!',
                            'Xóa liên hệ thành công!',
                            'success'
                        );
                        this.loadTable();
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Lỗi!!!',
                            text: 'Xóa liên hệ thất bại. Có lỗi xảy ra!',
                        })
                    }
                })
            }
        })
    }

}
