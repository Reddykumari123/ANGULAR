import { TestBed } from '@angular/core/testing';

import { RetailorDetailsService } from './retailor-details.service';

describe('RetailorDetailsService', () => {
  let service: RetailorDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RetailorDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
