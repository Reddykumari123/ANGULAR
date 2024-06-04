import { TestBed } from '@angular/core/testing';

import { DsrService } from './dsr.service';

describe('DsrService', () => {
  let service: DsrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DsrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
