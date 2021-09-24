import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseC1Component } from './course-c1.component';

describe('CourseC1Component', () => {
  let component: CourseC1Component;
  let fixture: ComponentFixture<CourseC1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseC1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseC1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
