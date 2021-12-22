import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { CourseService } from 'src/app/Services/course.service';
import { ExportExelService } from 'src/app/Services/export-exel.service';
import Swal from 'sweetalert2';
import { ClassService } from 'src/app/Services/class.service';
import { AuthService } from 'src/app/Services/auth.service';
import { ServeHttpService } from 'src/app/Services/serve-http.service';

@Component({
    selector: 'app-teacher-statistic',
    templateUrl: './teacher-statistic.component.html',
    styleUrls: ['./teacher-statistic.component.scss']
})
export class TeacherStatisticComponent implements OnInit {

    tea_id;
    tea_code;
    displayedColumns: string[] = ['stu_code', 'stu_name', 'stu_email', 'stu_gender', 'stu_birthday', 'stu_phone', 'cou_name', 'cla_course', 'cla_code', 'tea_name', 'cla_start', 'cla_status', 'pay_type', 're_result'];
    dataSource = new MatTableDataSource();
    data;
    courseData;
    classData;
    formDate;
    toDate;
    cla_course = '';
    status = '0';
    result = '0';
    cou_id = '0';
    status_class = '0';
    cla_id = '0';
    es_status = '0';
    // totalPrice = 0;
    // totalPass = 0;
    // totalFail = 0;
    // totalPay = 0;
    // totalPayFail = 0;

    constructor(
        private course: CourseService,
        private classService: ClassService,
        private exportService: ExportExelService,
        private auth: AuthService,
        private user: ServeHttpService,
    ) { }

    @ViewChild(MatPaginator, { static: false })
    set paginator(value: MatPaginator) {
        if (this.dataSource) {
            this.dataSource.paginator = value;
        }
    }

    @ViewChild(MatSort, { static: false })
    set sort(value: MatSort) {
        if (this.dataSource) {
            this.dataSource.sort = value;
        }
    }

    ngOnInit(): void {
        this.tea_code = this.auth.getInfo();
        this.user.getUserById(this.tea_code).subscribe((result)=>{
            this.tea_id = result.data[0].tea_id;
            this.onSearch();
            this.loadClass();
        })
        this.course.getAllCourse().subscribe((result) => {
            this.courseData = result.data;
        });
    }

    loadTable(data1) {
        this.data = data1;
        this.dataSource = new MatTableDataSource(data1);
        // this.totalPrice = 0;
        // this.totalPass = 0;
        // this.totalFail = 0;
        // this.totalPay = 0;
        // this.totalPayFail = 0;
        // this.data.forEach(element => {
        //     this.totalPrice += element.cla_fee;
        //     if (element.re_result == 1)
        //         this.totalPass += 1;
        //     else if (element.re_result == 0)
        //         this.totalFail += 1;
        //     if (element.pay_type) {
        //         this.totalPay += 1;
        //     } else {
        //         this.totalPayFail += 1;
        //     }
        // });
    }

    async loadClass(){
        if(this.cou_id != '0'){
            let kq = await this.classService.getAllClassByCourse(this.cou_id).toPromise();
            if(this.cla_course == ''){
                this.classData = kq.data;
            }else{
                let data = kq.data.filter( element => element.cla_course == this.cla_course );
                this.classData = data.filter( element => element.tea_id == this.tea_id );
            }
        }else{
            let kq = await this.classService.getAllClass().toPromise();
            if(this.cla_course == ''){
                this.classData = kq.data;
            }else{
                let data = kq.data.filter( element => element.cla_course == this.cla_course );
                this.classData = data.filter( element => element.tea_id == this.tea_id );
            }
        }
        console.log(this.classData.filter( element => element.tea_id == this.tea_id ));
    }

    async onSearch() {
        let data = {
            start: this.formDate,
            end: this.toDate,
            pay_type: this.status,
            re_result: this.result,
            cou_id: this.cou_id,
            status: this.status_class,
            cla_course: this.cla_course,
            cla_id: this.cla_id,
            es_status: this.es_status,
            tea_id: this.tea_id,
        };
        let kq = await this.course.getStatisticTeacher(data).toPromise();
        this.loadTable(kq.data);
    }

    export() {
        let dataExport = [];
        this.data.forEach(element => {
            let gender = (element.stu_gender == 0) ? 'Nam' : 'Nữ';
            let birthday = moment(element.stu_birthday).format("DD/MM/YYYY");
            let cla_start = moment(element.cla_start).format("DD/MM/YYYY");
            let status = (element.pay_type == null) ? 'Chưa đóng học phí' : 'Đã đóng học phí';
            let result;
            if (element.re_result != null && element.re_result == 0) {
                result = 'Rớt';
            } else if (element.re_result == 1) {
                result = 'Đậu';
            } else {
                result = 'Chưa thi';
            }
            dataExport.push({
                'Mã HV': element.stu_code, 'Họ và Tên': element.stu_name, 'Giới tính': gender, 'Email': element.stu_email, 'SĐT': element.stu_phone, 'Ngày sinh': birthday,
                'Hạng bằng lái': element.cou_name, 'Mã lớp': element.cla_code, 'Khóa học': element.cla_course,'Tên giáo viên': element.tea_name, 'Ngày khai giảng': cla_start,'Học phí': element.cla_fee, 'Trạng thái': status, 'Kết quả': result
            });
        });
        this.exportService.exportExcel(dataExport, 'Thống kê');
    }

}
