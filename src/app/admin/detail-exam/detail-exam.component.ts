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

    displayedColumns: string[] = ['id', 'stu_code', 'stu_name', 'stu_email', 'stu_gender', 'stu_phone', 'cla_code', 'cla_name', 'cla_course', 're_result', 'action'];
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

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
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
            title: 'Xa??c nh????n?',
            text: "Ba??n co?? mu????n xa??c nh????n c????p nh????t danh sa??ch ho??c vi??n ???? d??????i!",
            icon: 'question',
            showCancelButton: true,
            reverseButtons: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#9A9483',
            confirmButtonText: 'Xa??c nh????n',
            cancelButtonText: 'Hu??y'
        }).then(async (result) => {
            if (result.isConfirmed) {
                let kq = await this.studentExam.createExamStudent(data).toPromise();
                if (kq.status == 1) {
                    Swal.fire({
                        icon: 'success',
                        text: "C????p nh????t danh sa??ch ho??c vi??n thi b????ng la??i tha??nh c??ng!",
                        timer: 2000
                    })
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'L????i',
                        text: "C????p nh????t danh sa??ch ho??c vi??n thi b????ng la??i th????t ba??i!"
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
            let gender = (element.stu_gender == 0) ? 'Nam' : 'N????';
            let birthday = moment(element.stu_birthday).format("DD/MM/YYYY");
            let result, theory = '', practice = '';
            if (element.re_result != null && element.re_result == 0) {
                result = 'R????t';
            } else if (element.re_result == 1) {
                result = '??????u';
            } else {
                result = '';
            }
            if (element.re_theoryResult == 0) {
                theory = 'R????t';
            } else if (element.re_theoryResult == 1) {
                theory = '??????u';
            }
            if (element.re_practiceResult == 0) {
                practice = 'R????t';
            } else if (element.re_practiceResult == 1) {
                practice = '??????u';
            }
            dataExport.push({
                'Ma?? HV': element.stu_code, 'Ho?? va?? T??n': element.stu_name, 'Gi????i ti??nh': gender, 'Email': element.stu_email, 'S??T': element.stu_phone, 'Nga??y sinh': birthday,
                'Ma?? l????p': element.cla_code, 'Kho??a ho??c': element.cla_course, 'T??n gia??o vi??n': element.tea_name,
                '??i????m ly?? thuy????t': element.re_theory, 'T????ng ??i????m ly?? thuy????t': element.re_theoryTotal, 'K????t qua?? thi ly?? thuy????t': theory, '??i????m th????c ha??nh': element.re_practice, 'T????ng ??i????m th????c ha??nh': element.re_practiceTotal, 'K????t qua?? thi th????c ha??nh': practice, 'K????t qua??': result
            });
        });
        this.exportService.exportExcel(dataExport, 'DS ho??c vi??n thi b????ng ' + this.data.cou_name + ' Nga??y: ' + moment(this.data.ex_date).format("DD/MM/YYYY"));
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
            let found = this.dataStudent.filter(el => el.stu_code == element['Ma?? HV']);
            if(found.length > 0){
                let result = (element['K????t qua??']=='??????u')? 1:0;
                let resultTheory = (element['K????t qua?? thi ly?? thuy????t']=='??????u')? 1:0;
                let resultPractice = (element['K????t qua?? thi th????c ha??nh']=='??????u')? 1:0;
                if(found[0].re_result != null && element['K????t qua??'] != ''){
                    this.arrCreate.push({es_id: found[0].es_id, re_theory: element['??i????m ly?? thuy????t'], re_theoryTotal: element['T????ng ??i????m ly?? thuy????t'], re_theoryResult: resultTheory,
                        re_practice: element['??i????m th????c ha??nh'], re_practiceTotal: element['T????ng ??i????m th????c ha??nh'], re_practiceResult: resultPractice, re_result: result});
                    this.arrUpdate.push(found[0].es_id);
                    }else if(element['K????t qua??'] != ''){
                    this.arrCreate.push({es_id: found[0].es_id, re_theory: element['??i????m ly?? thuy????t'], re_theoryTotal: element['T????ng ??i????m ly?? thuy????t'], re_theoryResult: resultTheory,
                    re_practice: element['??i????m th????c ha??nh'], re_practiceTotal: element['T????ng ??i????m th????c ha??nh'], re_practiceResult: resultPractice, re_result: result});
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
                    text: 'Th??m k????t qua?? tha??nh c??ng!',
                    timer: 2000
                })
            }else{
                Swal.fire({
                    icon:'error',
                    text: 'Co?? l????i xa??y ra khi ??ang th??m k????t qua??!',
                    timer: 2000
                })
            };
        }else{
            Swal.fire({
                icon:'error',
                text: 'Co?? ho??c vi??n kh??ng n????m trong danh sa??ch thi!',
                timer: 4000
            })
        }

        
        this.studentExam.getStudentByExams(this.id).subscribe((result) => {
            this.dataStudent = result.data;
            this.dataSource = new MatTableDataSource(this.dataStudent);
        });
    }
}
