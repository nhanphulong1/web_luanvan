import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/Services/course.service';


@Component({
  selector: 'app-course-b2',
  templateUrl: './course-b2.component.html',
  styleUrls: ['./course-b2.component.scss']
})
export class CourseB2Component implements OnInit {

  constructor(
    private course: CourseService
  ) { }

  public data;

  ngOnInit(): void {
    this.course.getCourseByName('B2').subscribe((data) => {
			this.data = data.data;
		})
  }

}
