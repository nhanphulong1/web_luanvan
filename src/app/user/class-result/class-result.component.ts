import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { ClassService } from 'src/app/Services/class.service';
import { ResultService } from 'src/app/Services/result.service';
import { ServeHttpService } from 'src/app/Services/serve-http.service';
import { StudentService } from 'src/app/Services/student.service';

@Component({
    selector: 'app-class-result',
    templateUrl: './class-result.component.html',
    styleUrls: ['./class-result.component.scss']
})
export class ClassResultComponent implements OnInit {

    constructor(
        private route: ActivatedRoute,
        private classService: ClassService,
        private student: StudentService,
        private user: ServeHttpService,
        private auth: AuthService,
    ) { }

    id;
    data;
    dataResult;
    type;
    dataClass;

    ngOnInit(): void {
        this.route.paramMap.subscribe((params: ParamMap) => {
            this.id = params.get('id');
        });
        this.type = this.auth.getType();
        this.classService.getClassById(this.id).subscribe((result)=>{
            this.dataClass = result.data[0];
        })
        this.getData();
    }

    async getData(){
        let idAccount = this.auth.getInfo();
        let student = await this.user.getUserById(idAccount).toPromise();
        let arrstudent = await this.classService.getStudentInClass(this.id).toPromise();
        this.data = arrstudent.data.filter(element => 
            element.stu_id == student.data[0].stu_id
        )[0];
        let studentData = await this.student.getStudentById(this.data.stu_id).toPromise();
        this.dataResult = studentData.data[0];
    }
}
