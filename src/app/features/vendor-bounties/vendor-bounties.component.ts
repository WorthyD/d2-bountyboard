import { Component, Input, OnInit } from '@angular/core';

import { VendorService } from '@core/definition-services/vendor.service';
import { DestinyDefinitionsDestinyVendorDefinition } from 'bungie-api-angular';
@Component({
  selector: 'app-vendor-bounties',
  templateUrl: './vendor-bounties.component.html',
  styleUrls: ['./vendor-bounties.component.scss']
})
export class VendorBountiesComponent implements OnInit {
  @Input()
  vendorHash: string;

  definition: DestinyDefinitionsDestinyVendorDefinition;
  constructor(private vendorService: VendorService) {}

  ngOnInit(): void {
    this.definition = this.vendorService.definitions[this.vendorHash];
  }
}
