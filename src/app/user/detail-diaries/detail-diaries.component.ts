import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AttendanceService } from 'src/app/Services/attendance.service';
import { AuthService } from 'src/app/Services/auth.service';
import { ClassService } from 'src/app/Services/class.service';
import { DiariesService } from 'src/app/Services/diaries.service';

@Component({
    selector: 'app-detail-diaries',
    templateUrl: './detail-diaries.component.html',
    styleUrls: ['./detail-diaries.component.scss']
})
export class DetailDiariesComponent implements OnInit {

    displayedColumns: string[] = ['id', 'stu_code', 'stu_name', 'stu_email', 'stu_gender', 'stu_birthday', 'stu_phone'];
    dataSource = new MatTableDataSource();
    di_id;
    cla_id;
    cla_name;
    diaryData;
    type;

    constructor(
        private route: ActivatedRoute,
        private diaries: DiariesService,
        private attendance: AttendanceService,
        private classService: ClassService,
        private auth: AuthService,
    ) { }

    ngOnInit(): void {
        this.type = this.auth.getType();
        this.route.paramMap.subscribe((params: ParamMap) => {
            this.di_id = params.get('id');
        });
        this.loadValue();
    }

    async loadValue(){
        let diary = await this.diaries.getDiariesById(this.di_id).toPromise();
        this.diaryData = diary.data[0];
        this.cla_id = this.diaryData.cla_id;
        let classData = await this.classService.getClassById(this.cla_id).toPromise();
        this.cla_name = classData.data[0].cla_name;
        let atten = await this.attendance.getAttendanceByDiaries(this.diaryData.di_id).toPromise();
        this.dataSource = new MatTableDataSource(atten.data);
    }

}
