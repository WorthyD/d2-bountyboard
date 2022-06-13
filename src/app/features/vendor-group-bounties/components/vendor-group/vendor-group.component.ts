import { Component, Input, OnInit } from '@angular/core';
import { VendorGroupService } from '@core/definition-services/vendor-group.service';

import { DestinyDefinitionsDestinyVendorGroupDefinition } from 'bungie-api-angular';
@Component({
  selector: 'app-vendor-group',
  templateUrl: './vendor-group.component.html',
  styleUrls: ['./vendor-group.component.scss']
})
export class VendorGroupComponent implements OnInit {
  @Input()
  vendorGroupHash: number;

  definition: DestinyDefinitionsDestinyVendorGroupDefinition;
  constructor(private vendorGroupService: VendorGroupService) {}

  ngOnInit(): void {
    console.log(this.vendorGroupService.definitions);
    this.definition = this.vendorGroupService.definitions[this.vendorGroupHash];
  }
}
