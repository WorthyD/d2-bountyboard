import { Component, Input, OnInit } from '@angular/core';

import { VendorService } from '@core/definition-services/vendor.service';
import { select, State } from '@ngrx/store';
import { DestinyDefinitionsDestinyVendorDefinition } from 'bungie-api-angular';
import { selectVendorCategoryBounties } from '@core/store/vendor/vendor.selectors';
@Component({
  selector: 'app-vendor-bounties',
  templateUrl: './vendor-bounties.component.html',
  styleUrls: ['./vendor-bounties.component.scss']
})
export class VendorBountiesComponent implements OnInit {
  @Input()
  vendorHash: string;

  itemIndexes$;

  definition: DestinyDefinitionsDestinyVendorDefinition;
  constructor(private vendorService: VendorService, private store: State<any>) {}

  ngOnInit(): void {
    this.definition = this.vendorService.definitions[this.vendorHash];
    const bountyIndex =
      this.definition?.displayCategories?.find((dc) => dc.identifier === 'category_bounties')?.index || undefined;

    if (bountyIndex) {
      console.log(this.definition?.displayProperties?.name, bountyIndex);
      this.itemIndexes$ = this.store.pipe(select(selectVendorCategoryBounties(this.vendorHash, bountyIndex)));
    }
  }
}
