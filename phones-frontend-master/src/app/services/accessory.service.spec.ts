import { TestBed, inject } from '@angular/core/testing';

import { AccessoryService } from './accessory.service';

describe('AccessoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccessoryService]
    });
  });

  it('should be created', inject([AccessoryService], (service: AccessoryService) => {
    expect(service).toBeTruthy();
  }));
});
