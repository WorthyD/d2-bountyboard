import { Component, Input, OnInit } from '@angular/core';
import { VendorGroupService } from '@core/definition-services/vendor-group.service';
import { VendorGroupDisplay } from '@features/vendor-group-bounties/interfaces/vendor-group-display';

import { DestinyDefinitionsDestinyVendorGroupDefinition } from 'bungie-api-angular';
@Component({
  selector: 'app-vendor-group',
  templateUrl: './vendor-group.component.html',
  styleUrls: ['./vendor-group.component.scss']
})
export class VendorGroupComponent implements OnInit {
  @Input()
  vendorGroupDisplay: VendorGroupDisplay;

  definition: DestinyDefinitionsDestinyVendorGroupDefinition;
  constructor(private vendorGroupService: VendorGroupService) {}

  ngOnInit(): void {
    //console.log(this.vendorGroupService.definitions);
    //this.definition = this.vendorGroupService.definitions[this.vendorGroupHash];
  }
}
