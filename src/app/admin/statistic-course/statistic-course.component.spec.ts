import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticCourseComponent } from './statistic-course.component';

describe('StatisticCourseComponent', () => {
  let component: StatisticCourseComponent;
  let fixture: ComponentFixture<StatisticCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
