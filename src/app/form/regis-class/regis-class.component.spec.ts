import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisClassComponent } from './regis-class.component';

describe('RegisClassComponent', () => {
  let component: RegisClassComponent;
  let fixture: ComponentFixture<RegisClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisClassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
