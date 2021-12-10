import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DialogResultComponent } from 'src/app/form/dialog-result/dialog-result.component';
import { AddExamsComponent } from 'src/app/form/add-exams/add-exams.component';
import { ExamStudentService } from 'src/app/Services/exam-student.service';
import { ExamService } from 'src/app/Services/exam.service';
import Swal from 'sweetalert2';
import { ClassService } from 'src/app/Services/class.service';
import * as moment from 'moment';
import * as XLSX from 'xlsx';
import { ExportExelService } from 'src/app/Services/export-exel.service';
import { ResultService } from 'src/app/Services/result.service';

@Component({
    selector: 'app-detail-exam',
    templateUrl: './detail-exam.component.html',
    styleUrls: ['./detail-exam.component.scss']
})
export class DetailExamComponent implements OnInit {

    displayedColumns: string[] = ['id', 'stu_code', 'stu_name', 'stu_email', 'stu_gender', 'stu_phone', 'cla_code', 'cla_name', 'cla_course', 'tea_name', 're_result', 'action'];
    dataSource = new MatTableDataSource();
    id;
    data;
    dataStudent = [];
    dataExcel = [];
    arrCreate = [];
    arrUpdate = [];
    newStudent = [];
    check: Boolean = false;
    check1: Boolean = true;
    checkimport: Boolean = true;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private exam: ExamService,
        private result: ResultService,
        private exportService: ExportExelService,
        private studentExam: ExamStudentService,
        private classService: ClassService,
        private dialog: MatDialog,
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
        this.exam.getExamsById(this.id).subscribe((result) => {
            this.data = result.data[0];
            let date1 = moment(this.data.ex_date).format('YYYY-MM-DD');
            if (new Date(date1 + ' 23:59:59') < new Date()) {
                this.check = true;
            }
        });
        this.studentExam.getStudentByExams(this.id).subscribe((result) => {
            this.dataStudent = result.data;
            this.dataSource = new MatTableDataSource(this.dataStudent);
        });
    }

    async getStudent(id) {
        // let kq = await this.student.getStudentByCourse(id).toPromise();
        // let arr = kq.data;
        // if(arr.length >0){
        //     kq.data.forEach(element => {
        //         if(this.check1){
        //             this.dataStudent.push(element);
        //             this.newStudent.push(element);
        //         }
        //     });
        //     this.check1 = false;
        // }
        // this.dataSource = new MatTableDataSource(this.dataStudent);
        const dialogRef = this.dialog.open(AddExamsComponent, {
            width: '600px',
            data: { cou_id: id }
        })

        dialogRef.afterClosed().subscribe((result) => {
            this.classService.getStudentInClass(result).subscribe((kq) => {
                kq.data.forEach(element => {
                    if (!this.dataStudent.some(el => el.stu_code == element.stu_code)) {
                        this.dataStudent.push(element);
                        this.newStudent.push(element);
                    }
                });
                if (this.newStudent.length > 0) {
                    this.check1 = false;
                }
                this.dataSource = new MatTableDataSource(this.dataStudent);
            })
        })
    }

    async createStudentExam(id) {
        let data = {
            ex_id: id,
            arrStudent: this.newStudent
        };
        Swal.fire({
            title: 'Xác nhận?',
            text: "Bạn có muốn xác nhận cập nhật danh sách học viên ở dưới!",
            icon: 'question',
            showCancelButton: true,
            reverseButtons: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#9A9483',
            confirmButtonText: 'Xác nhận',
            cancelButtonText: 'Hủy'
        }).then(async (result) => {
            if (result.isConfirmed) {
                let kq = await this.studentExam.createExamStudent(data).toPromise();
                if (kq.status == 1) {
                    Swal.fire({
                        icon: 'success',
                        text: "Cập nhật danh sách học viên thi bằng lái thành công!",
                        timer: 2000
                    })
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Lỗi',
                        text: "Cập nhật danh sách học viên thi bằng lái thất bại!"
                    })
                }
            }
        })
    }

    updateResult(id) {
        const dialogRef = this.dialog.open(DialogResultComponent, {
            width: '550px',
            data: { es_id: id }
        });
        dialogRef.afterClosed().subscribe(() => {
            this.studentExam.getStudentByExams(this.id).subscribe((result) => {
                this.dataStudent = result.data;
                this.dataSource = new MatTableDataSource(this.dataStudent);
            });
        })
    }

    export() {
        let dataExport = [];
        this.dataStudent.forEach(element => {
            let gender = (element.stu_gender == 0) ? 'Nam' : 'Nữ';
            let birthday = moment(element.stu_birthday).format("DD/MM/YYYY");
            let result, theory = '', practice = '';
            if (element.re_result != null && element.re_result == 0) {
                result = 'Rớt';
            } else if (element.re_result == 1) {
                result = 'Đậu';
            } else {
                result = '';
            }
            if (element.re_theoryResult == 0) {
                theory = 'Rớt';
            } else if (element.re_theoryResult == 1) {
                theory = 'Đậu';
            }
            if (element.re_practiceResult == 0) {
                practice = 'Rớt';
            } else if (element.re_practiceResult == 1) {
                practice = 'Đậu';
            }
            dataExport.push({
                'Mã HV': element.stu_code, 'Họ và Tên': element.stu_name, 'Giới tính': gender, 'Email': element.stu_email, 'SĐT': element.stu_phone, 'Ngày sinh': birthday,
                'Mã lớp': element.cla_code, 'Khóa học': element.cla_course, 'Tên giáo viên': element.tea_name,
                'Điểm lý thuyết': element.re_theory, 'Tổng điểm lý thuyết': element.re_theoryTotal, 'Kết quả thi lý thuyết': theory, 'Điểm thực hành': element.re_practice, 'Tổng điểm thực hành': element.re_practiceTotal, 'Kết quả thi thực hành': practice, 'Kết quả': result
            });
        });
        this.exportService.exportExcel(dataExport, 'DS học viên thi bằng ' + this.data.cou_name + ' Ngày: ' + moment(this.data.ex_date).format("DD/MM/YYYY"));
    }

    importFile() {
        let input = document.getElementById('input-file');
        input.click();
    }

    onFileChange(ev) {
        let workBook = null;
        let jsonData = null;
        const reader = new FileReader();
        const file = ev.target.files[0];
        reader.onload = (event) => {
            const data = reader.result;
            workBook = XLSX.read(data, { type: 'binary' });
            jsonData = workBook.SheetNames.reduce((initial, name) => {
                const sheet = workBook.Sheets[name];
                initial[name] = XLSX.utils.sheet_to_json(sheet);
                return initial;
            }, {});
            this.dataExcel = jsonData.data;
            this.updateResultExcel();
        }
        reader.readAsBinaryString(file);
    }

    async updateResultExcel(){
        this.dataExcel.forEach(element => {
            let found = this.dataStudent.filter(el => el.stu_code == element['Mã HV']);
            if(found.length > 0){
                let result = (element['Kết quả']=='Đậu')? 1:0;
                let resultTheory = (element['Kết quả thi lý thuyết']=='Đậu')? 1:0;
                let resultPractice = (element['Kết quả thi thực hành']=='Đậu')? 1:0;
                if(found[0].re_result != null && element['Kết quả'] != ''){
                    this.arrCreate.push({es_id: found[0].es_id, re_theory: element['Điểm lý thuyết'], re_theoryTotal: element['Tổng điểm lý thuyết'], re_theoryResult: resultTheory,
                        re_practice: element['Điểm thực hành'], re_practiceTotal: element['Tổng điểm thực hành'], re_practiceResult: resultPractice, re_result: result});
                    this.arrUpdate.push(found[0].es_id);
                    }else if(element['Kết quả'] != ''){
                    this.arrCreate.push({es_id: found[0].es_id, re_theory: element['Điểm lý thuyết'], re_theoryTotal: element['Tổng điểm lý thuyết'], re_theoryResult: resultTheory,
                    re_practice: element['Điểm thực hành'], re_practiceTotal: element['Tổng điểm thực hành'], re_practiceResult: resultPractice, re_result: result});
                }  
            }else{
                this.checkimport = false;
            }
        });


        
        if(this.checkimport){
            let data = {
                arrResult: this.arrCreate,
                arrDelete: this.arrUpdate
            }
    
            let kq = await this.result.createMultiResult(data).toPromise();
            if(kq.status == 1){
                Swal.fire({
                    icon: 'success',
                    text: 'Thêm kết quả thành công!',
                    timer: 2000
                })
            }else{
                Swal.fire({
                    icon:'error',
                    text: 'Có lỗi xảy ra khi đang thêm kết quả!',
                    timer: 2000
                })
            };
        }else{
            Swal.fire({
                icon:'error',
                text: 'Có học viên không nằm trong danh sách thi!',
                timer: 4000
            })
        }

        
        this.studentExam.getStudentByExams(this.id).subscribe((result) => {
            this.dataStudent = result.data;
            this.dataSource = new MatTableDataSource(this.dataStudent);
        });
    }
}
