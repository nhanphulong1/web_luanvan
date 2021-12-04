import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ClassService } from 'src/app/Services/class.service';
import { DiariesService } from 'src/app/Services/diaries.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-detail-class-complete',
    templateUrl: './detail-class-complete.component.html',
    styleUrls: ['./detail-class-complete.component.scss']
})
export class DetailClassCompleteComponent implements OnInit {


    displayedColumns: string[] = ['di_date', 'di_content', 'di_type', 'di_start', 'di_end', 'di_location'];
    dataSource = new MatTableDataSource();
    id;
    data;
    dataDiary;
    countTheory;
    countPractice;

    constructor(
        private classService: ClassService,
        private diaries: DiariesService,
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
        this.diaries.getDiariesByClass(this.id).subscribe((result) => {
            this.dataDiary = result.data;
            this.dataSource = new MatTableDataSource(this.dataDiary);
            this.countTheory = this.dataDiary.filter(element => element.di_type == 0).length;
            this.countPractice = this.dataDiary.filter(element => element.di_type == 1).length;
        });
    }

    updateStatus(id) {
        Swal.fire({
            title: 'Hoàn thành lớp học?',
            text: "Bạn có muốn hoàn thành lớp học này!",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Hoàn thành'
        }).then((result) => {
            if (result.isConfirmed) {
                var data = { 'cla_status': 1 };
                this.classService.updateStatus(id, data).subscribe((result) => {
                    console.log(result);
                    if (result.status == 1) {
                        Swal.fire(
                            'Success!',
                            'Hoàn thành lớp học thành công!',
                            'success'
                        ).then((result)=>{
                            this.router.navigate(['/admin/class/complete']);
                        });
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

}
