import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ClassService } from 'src/app/Services/class.service';
import Swal from 'sweetalert2';
import { StudentService } from 'src/app/Services/student.service';
import * as moment from 'moment';
import { ResultService } from 'src/app/Services/result.service';
import { PaymentComponent } from 'src/app/form/payment/payment.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-detail-student',
    templateUrl: './detail-student.component.html',
    styleUrls: ['./detail-student.component.scss']
})
export class DetailStudentComponent implements OnInit {
    displayedColumns: string[] = ['id', 'cla_code', 'cou_name', 'cla_start', 'cla_status', 're_result', 'action'];
    dataSource = new MatTableDataSource();
    id;
    data;
    dataResult;
    nowDate = moment(new Date).format('YYYY-MM-DD');

    constructor(
        private studentService: StudentService,
        private classService: ClassService,
        private result: ResultService,
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
        this.studentService.getStudentById(this.id).subscribe((result) => {
            this.data = result.data[0];
            this.getResult(this.data.es_id);
        });
        this.classService.getAllClassByStudent(this.id).subscribe((result) => {
            this.dataSource = new MatTableDataSource(result.data);
        });
    }

    getResult(id) {
        this.result.getResultById(id).subscribe((result) => {
            this.dataResult = result.data[0];
        })
    }

    openPayment(id) {
        const dialogRef = this.dialog.open(PaymentComponent, {
            width: '850px',
            data: { stu_id: id }
        });
        dialogRef.afterClosed().subscribe((result) => {
            this.studentService.getStudentById(this.id).subscribe((result) => {
                this.data = result.data[0];
                this.getResult(this.data.de_id);
            });
            this.classService.getAllClassByStudent(this.id).subscribe((result) => {
                this.dataSource = new MatTableDataSource(result.data);
            });
        })
    }

    deleteStudent(id) {
        Swal.fire({
            title: 'Xóa học viên?',
            text: "Bạn có muốn xóa học viên này!",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Xóa'
        }).then((result) => {
            if (result.isConfirmed) {
                this.studentService.deleteStudent(id).subscribe((result) => {
                    if (result.status == 1) {
                        Swal.fire(
                            'Deleted!',
                            'Xóa học viên thành công!',
                            'success'
                        ).then(() => {
                            this.router.navigate(['admin/student'])
                        });
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Lỗi!!!',
                            text: 'Xóa học viên thất bại.',
                        })
                    }
                })
            }
        })
    }
}
