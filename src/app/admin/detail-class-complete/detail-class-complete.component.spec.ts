import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailClassCompleteComponent } from './detail-class-complete.component';

describe('DetailClassCompleteComponent', () => {
  let component: DetailClassCompleteComponent;
  let fixture: ComponentFixture<DetailClassCompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailClassCompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailClassCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
