import { TestBed } from '@angular/core/testing';

import { CreateEventServiceService } from './create-event-service.service';

describe('CreateEventServiceService', () => {
  let service: CreateEventServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateEventServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
