import { TestBed } from '@angular/core/testing';

import { ServeHttpService } from './serve-http.service';

describe('ServeHttpService', () => {
  let service: ServeHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServeHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
