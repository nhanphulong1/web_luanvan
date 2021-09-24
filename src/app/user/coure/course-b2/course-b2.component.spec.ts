import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseB2Component } from './course-b2.component';

describe('CourseB2Component', () => {
  let component: CourseB2Component;
  let fixture: ComponentFixture<CourseB2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseB2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseB2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
