import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { DiariesService } from 'src/app/Services/diaries.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-class-diaries',
    templateUrl: './class-diaries.component.html',
    styleUrls: ['./class-diaries.component.scss']
})
export class ClassDiariesComponent implements OnInit {

    constructor(
        private route: ActivatedRoute,
        private auth: AuthService,
        private diaries: DiariesService,
    ) { }

    displayedColumns: string[] = ['di_date', 'di_content', 'di_type', 'di_location', 'di_status', 'action'];
    dataSource = new MatTableDataSource();
    id;
    data;
    type;

    ngOnInit(): void {
        this.route.paramMap.subscribe((params: ParamMap) => {
            this.id = params.get('id');
        });
        this.type = this.auth.getType();
        this.loadTable();
    }

    loadTable() {
        this.diaries.getDiariesByClass(this.id).subscribe((result) => {
            this.data = result.data;
            this.dataSource = new MatTableDataSource(this.data);
        })
    }

    updateDiaries(id, status) {
        let content='Bạn muốn mở điểm danh buổi học này!';
        let data = {
            di_status: 0
        };
        if(status == 0){
            content = 'Bạn muốn khóa điểm danh buổi học này!';
            data.di_status = 1;
        }
        Swal.fire({
            title: 'Cập nhật',
            text: content,
            icon: 'question',
            showCancelButton: true,
            cancelButtonColor: '#D0CAB2',
            confirmButtonColor: '#0F00FF',
            reverseButtons: true,
            cancelButtonText: 'Hủy',
            confirmButtonText: 'Cập nhật',
        }).then((result) => {
            if (result.isConfirmed) {
                this.diaries.updateStatusNotifi(id, data).subscribe((kq)=>{
                    if(kq.status == 1){
                        Swal.fire({
                            title: 'Thành công!',
                            text: 'Cập nhật thành công!',
                            icon: 'success'
                        });
                        this.loadTable();
                    }else{
                        Swal.fire({
                            title: 'Lỗi!',
                            text: 'Cập nhật thất bại!',
                            icon: 'error'
                        })
                    }
                })
            }
        })
    }

    deleteDiaries(id) {
        Swal.fire({
            title: 'Xóa nhật ký giảng dạy?',
            text: "Bạn muốn xóa nhật ký giảng dạy!",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#D0CAB2',
            confirmButtonColor: '#FF0000',
            reverseButtons: true,
            cancelButtonText: 'Hủy',
            confirmButtonText: 'Xóa',
        }).then((result) => {
            if (result.isConfirmed) {
                this.diaries.deleteDiaries(id).subscribe((result) => {
                    if (result.status == 1) {
                        Swal.fire({
                            title: 'Thành công!',
                            text: 'Xóa nhật ký giảng dạy thành công!',
                            icon: 'success'
                        }).then(() =>
                            this.loadTable()
                        )
                    } else {
                        console.log(result.message);
                        Swal.fire({
                            title: 'Lỗi!',
                            text: 'Xóa nhật ký giảng dạy thất bại!',
                            icon: 'error'
                        })
                    }
                })
            }
        })
    }

}
