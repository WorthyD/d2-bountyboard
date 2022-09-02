import { Component, Input, OnInit } from '@angular/core';
import { VendorGroupService } from '@core/definition-services/vendor-group.service';
import { Destiny2Service } from 'bungie-api-angular';
import { map, Observable } from 'rxjs';
import { VendorGroupDisplay } from './interfaces/vendor-group-display';
import { compare } from '@utilities/compare';

@Component({
  selector: 'app-vendor-group-bounties',
  templateUrl: './vendor-group-bounties.component.html',
  styleUrls: ['./vendor-group-bounties.component.scss']
})
export class VendorGroupBountiesComponent implements OnInit {
  @Input()
  isLoading: boolean = false;

  _vendorGroups;
  @Input()
  get vendorGroups() {
    return this._vendorGroups;
  }
  set vendorGroups(data) {
    this._vendorGroups = data;
    if (data) {
      this.joinVendorGroups(data);
    }
  }

  @Input()
  categories;

  vendorGroupDisplay: VendorGroupDisplay[];

  joinVendorGroups(vendorGroups: any) {
    const temp = vendorGroups?.data?.groups.map((vendorGroup) => {
      return {
        vendorGroup: vendorGroup,
        vendorDefinition: this.vendorGroupService.definitions[vendorGroup.vendorGroupHash] || {
          blacklisted: false,
          categoryName: '??',
          hash: vendorGroup.vendorGroupHash,
          index: 99,
          order: 99,
          redacted: false
        }
      };
    });

    this.vendorGroupDisplay = temp.sort((a, b) => {
      return compare(a.vendorDefinition.order, b.vendorDefinition.order, true);
    });
  }

  constructor(private vendorGroupService: VendorGroupService) {}

  data$: Observable<VendorGroupDisplay[]>;

  ngOnInit(): void {}
}
