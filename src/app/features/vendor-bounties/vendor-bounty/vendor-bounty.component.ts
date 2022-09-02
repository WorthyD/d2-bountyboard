import { Component, Input, OnInit } from '@angular/core';
import { InventoryItemService } from '@core/definition-services/inventory-item.service';
import { DestinyDefinitionsDestinyInventoryItemDefinition, DestinyEntitiesVendorsDestinyVendorSaleItemComponent } from 'bungie-api-angular';

@Component({
  selector: 'app-vendor-bounty',
  templateUrl: './vendor-bounty.component.html',
  styleUrls: ['./vendor-bounty.component.scss']
})
export class VendorBountyComponent implements OnInit {
  @Input()
  saleItem: DestinyEntitiesVendorsDestinyVendorSaleItemComponent;

  bountyDefinition: DestinyDefinitionsDestinyInventoryItemDefinition;
  constructor(private inventoryService: InventoryItemService) {

  }

  ngOnInit(): void {
    this.bountyDefinition = this.inventoryService.definitions[this.saleItem?.itemHash];
  }
}
