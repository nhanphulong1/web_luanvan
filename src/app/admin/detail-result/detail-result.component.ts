import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ClassService } from 'src/app/Services/class.service';
import { DetailService } from 'src/app/Services/detail.service';
import { PaymentService } from 'src/app/Services/payment.service';
import { ResultService } from 'src/app/Services/result.service';
import { StudentService } from 'src/app/Services/student.service';

@Component({
    selector: 'app-detail-result',
    templateUrl: './detail-result.component.html',
    styleUrls: ['./detail-result.component.scss']
})
export class DetailResultComponent implements OnInit {

    constructor(
        private route: ActivatedRoute,
        private detail: DetailService,
        private payment: PaymentService,
        private result: ResultService,
        private classService: ClassService,
        private student: StudentService,
        private router: Router,
    ) { }

    id;
    detailData;
    studentData;
    classData;
    paymentData=[];
    resultData;

    ngOnInit(): void {
        this.route.paramMap.subscribe((params: ParamMap) => {
            this.id = params.get('id');
        });
        this.getData();
    }

    async getData(){
        let detail = await this.detail.getDeatilById(this.id).toPromise();
        this.detailData = detail.data[0];
        let student = await this.student.getStudentById(this.detailData.stu_id).toPromise();
        this.studentData = student.data[0];
        let dataclass = await this.classService.getClassById(this.detailData.cla_id).toPromise();
        this.classData = dataclass.data[0];
        let result = await this.result.getResultById(this.detailData.de_id).toPromise();
        this.resultData = result.data[0];
        let pay = await this.payment.getPaymentById(this.detailData.de_id).toPromise();
        this.paymentData = pay.data;
        console.log(this.paymentData);
        
    }

}
