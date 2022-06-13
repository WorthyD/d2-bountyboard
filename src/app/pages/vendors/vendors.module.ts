import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorsComponent } from './vendors.component';
import { VendorsRoutingModule } from './vendors-routing.module';
import { VendorGroupBountiesModule } from '@features/vendor-group-bounties/vendor-group-bounties.module';

@NgModule({
  declarations: [VendorsComponent],
  imports: [CommonModule, VendorsRoutingModule, VendorGroupBountiesModule]
})
export class VendorsModule {}
