import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorBountiesComponent } from './vendor-bounties.component';

describe('VendorBountiesComponent', () => {
  let component: VendorBountiesComponent;
  let fixture: ComponentFixture<VendorBountiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorBountiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorBountiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
