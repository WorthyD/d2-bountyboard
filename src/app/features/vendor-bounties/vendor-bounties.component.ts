import { Component, Input, OnInit } from '@angular/core';

import { VendorService } from '@core/definition-services/vendor.service';
import { select, State } from '@ngrx/store';
import { DestinyDefinitionsDestinyVendorDefinition, DestinyResponsesPersonalDestinyVendorSaleItemSetComponent } from 'bungie-api-angular';
import { selectVendorCategoryBounties, selectVendorSales } from '@core/store/vendor/vendor.selectors';
import { VendorBountyDisplay } from './interfaces';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-vendor-bounties',
  templateUrl: './vendor-bounties.component.html',
  styleUrls: ['./vendor-bounties.component.scss']
})
export class VendorBountiesComponent implements OnInit {
  @Input()
  vendor: VendorBountyDisplay;

  vendorSales$: Observable<DestinyResponsesPersonalDestinyVendorSaleItemSetComponent>;
  //definition: DestinyDefinitionsDestinyVendorDefinition;
  constructor(private vendorService: VendorService, private store: State<any>) {}

  ngOnInit(): void {
    this.vendorSales$ = this.store.pipe(select(selectVendorSales(this.vendor?.vendorHash)));
    // this.definition = this.vendorService.definitions[this.vendorHash];
    // const bountyIndex =
    //   this.definition?.displayCategories?.find((dc) => dc.identifier === 'category_bounties')?.index || undefined;
    // if (bountyIndex) {
    //   console.log(this.definition?.displayProperties?.name, bountyIndex);
    //   this.itemIndexes$ = this.store.pipe(select(selectVendorCategoryBounties(this.vendorHash, bountyIndex)));
    // }
  }
}
