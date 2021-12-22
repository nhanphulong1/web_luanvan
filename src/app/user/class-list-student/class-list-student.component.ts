import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { ClassService } from 'src/app/Services/class.service';

@Component({
    selector: 'app-class-list-student',
    templateUrl: './class-list-student.component.html',
    styleUrls: ['./class-list-student.component.scss']
})
export class ClassListStudentComponent implements OnInit {

    displayedColumns: string[] = ['id', 'stu_code', 'stu_name', 'stu_email', 'stu_gender', 'stu_birthday', 'stu_phone'];
    dataSource = new MatTableDataSource();
    id;
    type;
    data;
    dataStudent;

    constructor(
        private route: ActivatedRoute,
        private classService: ClassService,
        private auth: AuthService,
    ) { }

    ngOnInit(): void {
        this.route.paramMap.subscribe((params: ParamMap) => {
            this.id = params.get('id');
        });
        this.type = this.auth.getType();
        this.classService.getClassById(this.id).subscribe((result)=>{
            this.data = result.data[0];
        })
        this.classService.getStudentInClass(this.id).subscribe((result) => {
            this.dataStudent = result.data;
            this.dataSource = new MatTableDataSource(result.data);
        })
    }
}
