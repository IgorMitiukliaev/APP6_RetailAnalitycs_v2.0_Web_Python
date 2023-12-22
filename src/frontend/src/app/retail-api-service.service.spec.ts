import { TestBed } from '@angular/core/testing';

import { RetailApiServiceService } from './retail-api-service.service';

describe('RetailApiServiceService', () => {
  let service: RetailApiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RetailApiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
