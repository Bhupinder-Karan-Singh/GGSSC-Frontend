import { TestBed } from '@angular/core/testing';

import { EventServiceService } from './event-service.service';

describe('CreateEventServiceService', () => {
  let service: EventServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
