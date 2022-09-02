import { Component, Input, OnInit } from '@angular/core';
import { VendorGroupService } from '@core/definition-services/vendor-group.service';
import { VendorService } from '@core/definition-services/vendor.service';
import { VendorBountyDisplay } from '@features/vendor-bounties/interfaces';
import { VendorGroupDisplay } from '@features/vendor-group-bounties/interfaces/vendor-group-display';

import {
  DestinyDefinitionsDestinyVendorGroupDefinition,
  DictionaryComponentResponseOfuint32AndDestinyVendorCategoriesComponent
} from 'bungie-api-angular';
@Component({
  selector: 'app-vendor-group',
  templateUrl: './vendor-group.component.html',
  styleUrls: ['./vendor-group.component.scss']
})
export class VendorGroupComponent implements OnInit {
  @Input()
  vendorGroupDisplay: VendorGroupDisplay;

  @Input()
  categories: DictionaryComponentResponseOfuint32AndDestinyVendorCategoriesComponent;

  definition: DestinyDefinitionsDestinyVendorGroupDefinition;
  constructor(private vendorGroupService: VendorGroupService, private vendorService: VendorService) {}

  vendorDisplay: VendorBountyDisplay[] = [];
  groupHasBounties = false;
  ngOnInit(): void {
    //console.log(this.vendorGroupService.definitions);
    //this.definition = this.vendorGroupService.definitions[this.vendorGroupHash];
    console.log(this.categories);
    this.vendorDisplay = this.vendorGroupDisplay.vendorGroup.vendorHashes.map((x) => {
      const vendorDefinition = this.vendorService.definitions[x];
      const bountyIndex =
        vendorDefinition?.displayCategories?.find((dc) => dc.identifier === 'category_bounties')?.index || undefined;
      return {
        vendorBountyIDs:
          this.categories?.data[x].categories.find((x) => x.displayCategoryIndex === bountyIndex)?.itemIndexes || [],
        vendorDefinition: vendorDefinition,
        vendorHash: x
      };
    });
    console.log(this.vendorDisplay);

    this.groupHasBounties = this.vendorDisplay.some((vd) => vd.vendorBountyIDs?.length > 0);
  }
}
