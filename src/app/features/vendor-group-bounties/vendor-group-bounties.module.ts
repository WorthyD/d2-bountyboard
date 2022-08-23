import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorGroupBountiesComponent } from './vendor-group-bounties.component';
import { VendorGroupComponent } from './components/vendor-group/vendor-group.component';
import { VendorBountiesModule } from '../vendor-bounties/vendor-bounties.module';

@NgModule({
  declarations: [VendorGroupBountiesComponent, VendorGroupComponent],
  exports: [VendorGroupBountiesComponent],
  imports: [CommonModule, VendorBountiesModule]
})
export class VendorGroupBountiesModule {}
