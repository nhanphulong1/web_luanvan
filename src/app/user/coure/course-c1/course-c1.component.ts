import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ClassService } from 'src/app/Services/class.service';
import { CourseService } from 'src/app/Services/course.service';

@Component({
	selector: 'app-course-c1',
	templateUrl: './course-c1.component.html',
	styleUrls: ['./course-c1.component.scss']
})
export class CourseC1Component implements OnInit {

	constructor(
		private course: CourseService,
		private route: ActivatedRoute,
	) { }

	public data;
	dataClass=[];
	name;
	length;

	ngOnInit(): void {
		this.route.paramMap.subscribe((params: ParamMap) => {
			this.name = params.get('name');
			this.loadData();
		});
	}

	async loadData(){
		let kq = await this.course.getCourseByName(this.name).toPromise();
		this.data = kq.data;
		let kq1 = await  this.course.checkClassbyCourse(this.data.cou_id).toPromise();
		this.dataClass = kq1.data;
		this.length = this.dataClass == null;	
	}

}
