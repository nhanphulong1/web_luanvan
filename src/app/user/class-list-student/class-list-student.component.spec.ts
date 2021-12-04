import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassListStudentComponent } from './class-list-student.component';

describe('ClassListStudentComponent', () => {
  let component: ClassListStudentComponent;
  let fixture: ComponentFixture<ClassListStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassListStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassListStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
