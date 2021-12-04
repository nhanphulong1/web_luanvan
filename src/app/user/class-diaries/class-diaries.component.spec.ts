import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassDiariesComponent } from './class-diaries.component';

describe('ClassDiariesComponent', () => {
  let component: ClassDiariesComponent;
  let fixture: ComponentFixture<ClassDiariesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassDiariesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassDiariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
