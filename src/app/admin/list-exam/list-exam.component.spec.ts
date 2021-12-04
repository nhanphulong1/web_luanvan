import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListExamComponent } from './list-exam.component';

describe('ListExamComponent', () => {
  let component: ListExamComponent;
  let fixture: ComponentFixture<ListExamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListExamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
