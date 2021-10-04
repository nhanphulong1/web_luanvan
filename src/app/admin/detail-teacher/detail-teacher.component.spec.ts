import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailTeacherComponent } from './detail-teacher.component';

describe('DetailTeacherComponent', () => {
  let component: DetailTeacherComponent;
  let fixture: ComponentFixture<DetailTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
