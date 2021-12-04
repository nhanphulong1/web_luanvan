import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClassService } from 'src/app/Services/class.service';
import { DiariesService } from 'src/app/Services/diaries.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-card-class',
    templateUrl: './card-class.component.html',
    styleUrls: ['./card-class.component.scss']
})
export class CardClassComponent implements OnInit {

    constructor(
        private classService: ClassService,
        private diaries: DiariesService,
        private router: Router,
    ) { }

    @Input() type: Number = 0;
    @Input() cla_id: Number = 0;

    data;

    ngOnInit(): void {
        this.classService.getClassById(this.cla_id).subscribe((result)=>{
            this.data = result.data[0];
        })
    }

    checkCompleteClass(){
        console.log('data',this.data , this.data.cla_diary / this.data.cou_quantity);
        if(this.data.cla_diary / this.data.cla_count > 0.7){
            return true;
        }
        return false;
    }

    async completeClass() {
        if(this.data.cla_complete == 1){
            Swal.fire({
                title: 'Đã gửi thông báo',
                text: 'Lớp học đã gửi thông báo hoàn thành!',
                icon: 'warning'
            })
        }else{
            Swal.fire({
                title: 'Hoàn thành lớp học?',
                text: "Bạn muốn báo cáo lớp học đã hoàn thành chương trình đào tạo!",
                icon: 'warning',
                showCancelButton: true,
                cancelButtonColor: '#D0CAB2',
                confirmButtonColor: '#3085d6',
                reverseButtons: true,
                cancelButtonText: 'Hủy',
                confirmButtonText: 'Hoàn thành',
            }).then((result) => {
                if (result.isConfirmed && this.checkCompleteClass()) {
                    let data = {
                        id: 1
                    }
                    this.classService.completeClass(this.cla_id, data).subscribe((kq) => {
                        console.log(data);
                        if (kq.status == 1) {
                            Swal.fire({
                                title: 'Thành công!',
                                text: 'Báo cáo hoàn thành lớp học thành công!',
                                icon: 'success'
                            })
                        } else {
                            Swal.fire({
                                title: 'Lỗi!',
                                text: 'Báo cáo hoàn thành lớp học thất bại!',
                                icon: 'error'
                            })
                        }
                    })
                }else if(!this.checkCompleteClass()){
                    Swal.fire({
                        text: 'Lớp học phải dạy trên 70% số tiết học quy định!',
                        icon: 'warning'
                    })
                }
            });
        }
    }

    async attendance(){
        let kq = await this.diaries.getDiariesByClass(this.cla_id).toPromise();
        let diariesResult = kq.data.filter( data => data.di_status == 0 );
        if(diariesResult.length > 0){
            this.router.navigate(['/front/class/atten/'+diariesResult[0].di_id]);
        }else{
            Swal.fire({
                text: 'Tạm thời chưa có điểm danh!',
                icon: 'warning'
            })
        }
    }

}
