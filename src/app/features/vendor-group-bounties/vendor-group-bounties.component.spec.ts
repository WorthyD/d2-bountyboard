import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorGroupBountiesComponent } from './vendor-group-bounties.component';

describe('VendorGroupBountiesComponent', () => {
  let component: VendorGroupBountiesComponent;
  let fixture: ComponentFixture<VendorGroupBountiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorGroupBountiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorGroupBountiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
