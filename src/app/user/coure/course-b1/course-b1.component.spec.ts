import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseB1Component } from './course-b1.component';

describe('CourseB1Component', () => {
  let component: CourseB1Component;
  let fixture: ComponentFixture<CourseB1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseB1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseB1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
