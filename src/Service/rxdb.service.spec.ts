import { TestBed } from '@angular/core/testing';

import { RXDBService } from './rxdb.service';

describe('RXDBService', () => {
  let service: RXDBService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RXDBService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
