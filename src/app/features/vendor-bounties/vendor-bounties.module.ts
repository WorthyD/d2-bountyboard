import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorBountiesComponent } from './vendor-bounties.component';

@NgModule({
  declarations: [VendorBountiesComponent],
  exports: [VendorBountiesComponent],
  imports: [CommonModule]
})
export class VendorBountiesModule {}
