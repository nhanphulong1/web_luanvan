import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import * as moment from 'moment';
import { CourseService } from 'src/app/Services/course.service';
import { ExportExelService } from 'src/app/Services/export-exel.service';
import { StudentService } from 'src/app/Services/student.service';
import Swal from 'sweetalert2';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { map, reduce, startWith } from 'rxjs/operators';
import { TeacherService } from 'src/app/Services/teacher.service';
import { ClassService } from 'src/app/Services/class.service';


@Component({
    selector: 'app-statistic2',
    templateUrl: './statistic2.component.html',
    styleUrls: ['./statistic2.component.scss']
})
export class Statistic2Component implements OnInit {

    displayedColumns: string[] = ['stu_code', 'stu_name', 'stu_email', 'stu_gender', 'stu_birthday', 'stu_phone', 'cou_name', 'cla_course', 'cla_code', 'tea_name', 'cla_start', 'cla_status', 'pay_type', 're_result'];
    dataSource = new MatTableDataSource();
    data;
    classData = [];
    courseData;
    formDate;
    toDate;
    cla_course = '';
    cla_id = '0';
    cou_id = '0';
    status_class = '0';
    
    totalPrice = 0;
    totalPass = 0;
    totalFail = 0;
    totalPay = 0;
    totalPayFail = 0;

    visible = true;
    selectable = true;
    removable = true;
    separatorKeysCodes: number[] = [ENTER, COMMA];
    fruitCtrl = new FormControl();
    filteredFruits: Observable<string[]>;
    fruits: string[] = [];
    allFruits: string[] = [];

    @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
    @ViewChild('auto') matAutocomplete: MatAutocomplete;

    constructor(
        private service: StudentService,
        private exportService: ExportExelService,
        private course: CourseService,
        private classService: ClassService,
        public dialog: MatDialog,
        private teacher: TeacherService,
    ) {
        teacher.getAllTeacher().subscribe((result) => {
            if (result.status == 1) {
                result.data.forEach(element => {
                    this.allFruits.push(element.tea_name);
                });
            }
            this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
                startWith(null),
                map((fruit: string | null) => fruit ? this._filter(fruit) : this.allFruits.slice()));
        })
    }

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
        // this.service.getAllStudent().subscribe((result) => {
        //     this.loadTable(result.data);
        // });
        this.onSearch();
        this.course.getAllCourse().subscribe((result) => {
            this.courseData = result.data;
        });
        this.loadClass();
    }

    loadTable(data1) {
        this.data = data1;
        this.dataSource = new MatTableDataSource(data1);
        this.totalPrice = 0;
        this.totalPass = 0;
        this.totalFail = 0;
        this.totalPay = 0;
        this.totalPayFail = 0;
        this.data.forEach(element => {
            this.totalPrice += element.cla_fee;
            if (element.re_result == 1)
                this.totalPass += 1;
            else if (element.re_result == 0)
                this.totalFail += 1;
            if (element.pay_type) {
                this.totalPay += 1;
            } else {
                this.totalPayFail += 1;
            }
        });
    }

    async loadClass(){
        if(this.cou_id != '0'){
            let kq = await this.classService.getAllClassByCourse(this.cou_id).toPromise();
            if(this.cla_course == ''){
                this.classData = kq.data;
            }else{
                this.classData = kq.data.filter( element => element.cla_course == this.cla_course );
            }
        }else{
            let kq = await this.classService.getAllClass().toPromise();
            if(this.cla_course == ''){
                this.classData = kq.data;
            }else{
                this.classData = kq.data.filter( element => element.cla_course == this.cla_course );
            }
        }
    }

    async onSearch() {
        let data = {
            start: this.formDate,
            end: this.toDate,
            cou_id: this.cou_id,
            teacher: this.fruits,
            status: this.status_class,
            cla_course: this.cla_course,
            cla_id: this.cla_id
        };
        let kq = await this.course.getStatistic2(data).toPromise();
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

    add(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;

        // Add our fruit
        if ((value || '').trim()) {
            this.fruits.push(value.trim());
        }

        // Reset the input value
        if (input) {
            input.value = '';
        }

        this.fruitCtrl.setValue(null);
    }

    remove(fruit: string): void {
        const index = this.fruits.indexOf(fruit);

        if (index >= 0) {
            this.fruits.splice(index, 1);
        }
    }

    selected(event: MatAutocompleteSelectedEvent): void {
        this.fruits.push(event.option.viewValue);
        this.fruitInput.nativeElement.value = '';
        this.fruitCtrl.setValue(null);
    }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();

        return this.allFruits.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
    }

}
