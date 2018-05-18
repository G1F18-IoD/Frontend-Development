import { TestBed, inject } from '@angular/core/testing';

import { RpiconnectionService } from './rpiconnection.service';

describe('RpiconnectionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RpiconnectionService]
    });
  });

  it('should be created', inject([RpiconnectionService], (service: RpiconnectionService) => {
    expect(service).toBeTruthy();
  }));
});
