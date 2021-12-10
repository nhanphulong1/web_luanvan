import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DialogResultComponent } from 'src/app/form/dialog-result/dialog-result.component';
import { ClassService } from 'src/app/Services/class.service';
import { DetailService } from 'src/app/Services/detail.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-detail-class',
    templateUrl: './detail-class.component.html',
    styleUrls: ['./detail-class.component.scss']
})
export class DetailClassComponent implements OnInit {
    displayedColumns: string[] = ['id', 'stu_code', 'stu_name', 'stu_phone', 'stu_count', 'pay_type', 're_result','action'];
    dataSource = new MatTableDataSource();
    id;
    data;

    constructor(
        private classService: ClassService,
        private detail: DetailService,
        private router: Router,
        private route: ActivatedRoute,
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
        this.route.paramMap.subscribe((params: ParamMap) => {
            this.id = params.get('id');
        });
        this.classService.getClassById(this.id).subscribe((result) => {
            if (result.status == 0) this.router.navigate(['/admin/class']);
            this.data = result.data[0];
        });
        this.classService.getStudentInClass(this.id).subscribe((result) => {
            this.dataSource = new MatTableDataSource(result.data);
        })
    }

    openDialog(de_id): void {
        const dialogRef = this.dialog.open(DialogResultComponent, {
          width: '550px',
          data: {de_id: de_id}
        });

        dialogRef.afterClosed().subscribe((result)=>{
            this.loadTable();
        })
      }

    loadTable(){
        this.classService.getStudentInClass(this.id).subscribe((result) => {
            this.dataSource = new MatTableDataSource(result.data);
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
                this.classService.deleteClass(id).subscribe((result) => {
                    console.log(result);
                    if (result.status == 1) {
                        Swal.fire(
                            'Thành công!',
                            'Xóa lớp học thành công!',
                            'success'
                        );
                        this.router.navigate(['/admin/class']);
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

    deleteUserInClass(de_id) {
        Swal.fire({
            title: 'Xóa học viên?',
            text: "Bạn có muốn xóa học viên khỏi lớp học này!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Hủy'
        }).then((result) => {
            if (result.isConfirmed) {
                this.detail.deleteDetail(de_id).toPromise()
                .then((result)=>{
                    if(result.status=1){
                        Swal.fire(
                            'Deleted!',
                            'Xóa học viên thành công!',
                            'success'
                        );
                        this.loadTable();
                    }
                    else 
                        Swal.fire({
                            icon: 'error',
                            title: 'Lỗi!!!',
                            text: 'Xóa học viên thất bại.',
                    });
                })
            }
        })
    }

}