import { TestBed, inject } from '@angular/core/testing';

import { HttpReqsService } from './http-reqs.service';

describe('HttpReqsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpReqsService]
    });
  });

  it('should be created', inject([HttpReqsService], (service: HttpReqsService) => {
    expect(service).toBeTruthy();
  }));
});
