import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/Services/course.service';

@Component({
	selector: 'app-course-c1',
	templateUrl: './course-c1.component.html',
	styleUrls: ['./course-c1.component.scss']
})
export class CourseC1Component implements OnInit {

	constructor(
		public course: CourseService
	) { }

	public data;

	ngOnInit(): void {
		this.course.getCourseByName('C1').subscribe((data) => {
			this.data = data.data;
		})
	}

}
