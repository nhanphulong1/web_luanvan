import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRegisComponent } from './list-regis.component';

describe('ListRegisComponent', () => {
  let component: ListRegisComponent;
  let fixture: ComponentFixture<ListRegisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListRegisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRegisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
