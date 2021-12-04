import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailDiariesComponent } from './detail-diaries.component';

describe('DetailDiariesComponent', () => {
  let component: DetailDiariesComponent;
  let fixture: ComponentFixture<DetailDiariesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailDiariesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailDiariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
