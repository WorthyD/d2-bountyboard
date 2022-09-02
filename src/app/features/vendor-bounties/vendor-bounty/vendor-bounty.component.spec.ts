import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorBountyComponent } from './vendor-bounty.component';

describe('VendorBountyComponent', () => {
  let component: VendorBountyComponent;
  let fixture: ComponentFixture<VendorBountyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorBountyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorBountyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
