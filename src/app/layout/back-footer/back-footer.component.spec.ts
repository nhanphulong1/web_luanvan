import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackFooterComponent } from './back-footer.component';

describe('BackFooterComponent', () => {
  let component: BackFooterComponent;
  let fixture: ComponentFixture<BackFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
