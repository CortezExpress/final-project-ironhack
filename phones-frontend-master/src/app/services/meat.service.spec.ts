import { TestBed, inject } from '@angular/core/testing';

import { MeatService } from './meat.service';

describe('MeatService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MeatService]
    });
  });

  it('should be created', inject([MeatService], (service: MeatService) => {
    expect(service).toBeTruthy();
  }));
});
