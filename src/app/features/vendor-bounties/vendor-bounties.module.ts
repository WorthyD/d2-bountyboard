import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorBountiesComponent } from './vendor-bounties.component';
import { VendorBountyComponent } from './vendor-bounty/vendor-bounty.component';

@NgModule({
  declarations: [VendorBountiesComponent, VendorBountyComponent],
  exports: [VendorBountiesComponent],
  imports: [CommonModule]
})
export class VendorBountiesModule {}
