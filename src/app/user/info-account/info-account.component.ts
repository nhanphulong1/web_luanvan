import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { ClassService } from 'src/app/Services/class.service';
import { ScheduleService } from 'src/app/Services/schedule.service';
import { ServeHttpService } from 'src/app/Services/serve-http.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-info-account',
    templateUrl: './info-account.component.html',
    styleUrls: ['./info-account.component.scss']
})
export class InfoAccountComponent implements OnInit {

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private auth: AuthService,
        private service: ServeHttpService,
        private schedule: ScheduleService,
        private classService: ClassService,
    ) { }

    isLogin;
    id;
    data;
    dataClass;
    dataSchedule;

    ngOnInit(): void {
        this.isLogin = this.auth.isLoggedIn();
        if (!this.isLogin)
            this.router.navigate(['home']);
        if (this.isLogin) {
            this.id = this.auth.getInfo();
            this.getData().then(() => {
                if (this.data.authen == 0) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Xác thực tài khoản',
                        text: 'Vui lòng xác thực tài khoản của bạn!',
                    }).then(() => {
                        this.router.navigate(['/front/authen']);
                    })
                };
            });
        }
    }

    async getData() {
        let dataAccount = await this.service.getUserById(this.id).toPromise();
        this.data = dataAccount.data[0];

        let resultClass = await this.classService.getAllClassByStudent(this.data.stu_id).toPromise();
        this.dataClass = resultClass.data[0];
        let result = await this.schedule.getScheduleByTeacher(this.data.tea_id).toPromise();
        this.dataSchedule = result.data;
    }

}
