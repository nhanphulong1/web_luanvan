import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { AuthService } from 'src/app/Services/auth.service';
import { ClassService } from 'src/app/Services/class.service';
import { CourseService } from 'src/app/Services/course.service';
import { ServeHttpService } from 'src/app/Services/serve-http.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-class-manage',
    templateUrl: './class-manage.component.html',
    styleUrls: ['./class-manage.component.scss']
})
export class ClassManageComponent implements OnInit {

    displayedColumns: string[] = ['id', 'cla_code', 'cla_name', 'cou_name', 'cla_course', 'action'];
    dataSource = new MatTableDataSource();
    courseData = [];
    name = '';
    cou_id = '';
    nowDate = moment(new Date).format('YYYY-MM-DD');
    status = '';

    constructor(
        private service: ClassService,
        private user: ServeHttpService,
        private auth: AuthService,
        private router: Router,
    ) { }

    @ViewChild(MatSort) set matSort(sort: MatSort) {
        if (!this.dataSource.sort) {
            this.dataSource.sort = sort;
        }
    }

    id;
    data;
    dataClass;

    ngOnInit(): void {
        if (!this.auth.isLoggedIn) {
            this.router.navigate(['home']);
        }
        this.id = this.auth.getInfo();
        this.getData();
    }

    async getData(){
        let dataAccount = await this.user.getUserById(this.id).toPromise();
        this.data = dataAccount.data[0];
        this.service.getAllClassByTeacher(this.data.tea_id).subscribe((result) => {
            this.dataClass = result.data.filter(cla => cla.cla_status == 0);
            this.dataSource = new MatTableDataSource(this.dataClass);
        });
    }


}
