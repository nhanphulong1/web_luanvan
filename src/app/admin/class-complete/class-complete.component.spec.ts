import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassCompleteComponent } from './class-complete.component';

describe('ClassCompleteComponent', () => {
  let component: ClassCompleteComponent;
  let fixture: ComponentFixture<ClassCompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassCompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
