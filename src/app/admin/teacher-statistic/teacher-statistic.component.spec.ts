import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherStatisticComponent } from './teacher-statistic.component';

describe('TeacherStatisticComponent', () => {
  let component: TeacherStatisticComponent;
  let fixture: ComponentFixture<TeacherStatisticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherStatisticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
