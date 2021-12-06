import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ClassService } from 'src/app/Services/class.service';
import { NewsService } from 'src/app/Services/news.service';
import { ScheduleService } from 'src/app/Services/schedule.service';

@Component({
    selector: 'app-detail-news',
    templateUrl: './detail-news.component.html',
    styleUrls: ['./detail-news.component.scss']
})
export class DetailNewsComponent implements OnInit {

    constructor(
        private news: NewsService,
        private classService: ClassService,
        private schedule: ScheduleService,
        private route: ActivatedRoute,
        private router: Router,
    ) { }

    data;
    dataClass;
    scheduleData = '';
    id;

    ngOnInit(): void {
        this.route.paramMap.subscribe((params: ParamMap) => {
            this.id = params.get('id');
        });
        this.news.getNewsById(this.id).subscribe((result)=>{
            this.data = result.data[0];
            if(this.data.length == 0){
                this.router.navigate(['/home']);
            }else{
                this.loadClass();
            }
        })
    }

    async loadClass(){
        let kq = await this.classService.getClassById(this.data.cla_id).toPromise();
        this.dataClass = kq.data[0];
        let kq1 = await this.schedule.getScheduleByClass(this.data.cla_id).toPromise();
        if(kq1.data.length > 0){
			kq1.data.forEach(element => {
				this.scheduleData += element.day_name + '  ';
			});
		}else{
			this.scheduleData= 'Chưa có thời khóa biểu!'
		}
    }

}
