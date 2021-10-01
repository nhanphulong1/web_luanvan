import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRegisComponent } from './form-regis.component';

describe('FormRegisComponent', () => {
  let component: FormRegisComponent;
  let fixture: ComponentFixture<FormRegisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormRegisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRegisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
