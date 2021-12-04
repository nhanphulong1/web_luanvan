import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { ClassService } from 'src/app/Services/class.service';
import { NotificationService } from 'src/app/Services/notification.service';
import { ServeHttpService } from 'src/app/Services/serve-http.service';
import { StudentService } from 'src/app/Services/student.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-class-teacher',
    templateUrl: './class-teacher.component.html',
    styleUrls: ['./class-teacher.component.scss']
})
export class ClassTeacherComponent implements OnInit {



    constructor(
        private route: ActivatedRoute,
        private notifi: NotificationService,
        private classService: ClassService,
        private student: StudentService,
        private auth: AuthService,
        private user: ServeHttpService,
        private router: Router,
    ) { }

    id;
    data;
    userData;
    classData;
    type;

    ngOnInit(): void {
        this.route.paramMap.subscribe((params: ParamMap) => {
            this.id = params.get('id');
            this.classService.getClassById(this.id).subscribe((result) => {
                this.classData = result.data[0];
                let idUser = this.auth.getInfo();
                this.user.getUserById(idUser).subscribe((result) => {
                    this.userData = result.data[0];
                    this.type = this.userData.type;
                    this.checkAccount();
                });
            })
        });
        this.loadNotifi();
    }

    checkAccount() {
        if (this.type == 1 && (this.classData?.tea_id != this.userData.tea_id)) {
            Swal.fire({
                icon: 'warning',
                text: 'Bạn không có quyền truy cập lớp này 1!',
                timer: 2500
            });
            this.router.navigate(['front/class/manage']);
        }
        if (this.type == 0) {
            this.student.getStudentById(this.userData.stu_id).subscribe((kq) => {
                if (!(this.id == kq.data[0].cla_id)) {
                    Swal.fire({
                        icon: 'warning',
                        text: 'Bạn không có quyền truy cập lớp này 2!',
                        timer: 2500
                    });
                    this.router.navigate(['front/class/'+kq.data[0].cla_id]);
                }
            });
        }
    }

    loadNotifi() {
        this.notifi.getNotifiByClass(this.id).subscribe((result) => {
            this.data = result.data;
        });
    }

    onUpdate(id) {
        this.router.navigate(['front/class/update/' + id]);
    }

    onDelete(id) {
        Swal.fire({
            title: 'Xóa Thông Báo?',
            text: "Bạn có muốn xóa thông báo này!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Xóa'
        }).then(async (result) => {
            if (result.isConfirmed) {
                let kq = await this.notifi.deleteNotifi(id).toPromise();
                if (kq.status == 1) {
                    Swal.fire(
                        'Thành công!',
                        'Xóa thông báo thành công!',
                        'success'
                    );
                    this.loadNotifi();
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Lỗi!!!',
                        text: 'Xóa thông báo thất bại.',
                    })
                }
            }
        })
    }



}
