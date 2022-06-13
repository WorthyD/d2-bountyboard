import { TestBed } from '@angular/core/testing';

import { VendorGroupService } from './vendor-group.service';

describe('VendorGroupService', () => {
  let service: VendorGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VendorGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
