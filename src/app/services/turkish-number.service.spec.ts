import { TestBed } from '@angular/core/testing';

import { TurkishNumberService } from './turkish-number.service';

describe('TurkishNumberService', () => {
  let service: TurkishNumberService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TurkishNumberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
