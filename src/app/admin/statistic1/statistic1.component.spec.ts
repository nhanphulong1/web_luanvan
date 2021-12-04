import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Statistic1Component } from './statistic1.component';

describe('Statistic1Component', () => {
  let component: Statistic1Component;
  let fixture: ComponentFixture<Statistic1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Statistic1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Statistic1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
