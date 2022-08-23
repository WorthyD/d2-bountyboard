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
  membershipId: bigint;
  @Input()
  membershipType: number;
  @Input()
  characterId: bigint;
  constructor(
    private vendorGroupService: VendorGroupService,
    private destiny2Service: Destiny2Service
  ) {}

  data$: Observable<VendorGroupDisplay[]>;

  ngOnInit(): void {
    //this.data$ = this.destiny2Service.destiny2GetPublicVendors([400]);
    this.data$ = this.destiny2Service
      .destiny2GetVendors(
        this.characterId as unknown as number,
        this.membershipId as unknown as number,
        this.membershipType,
        [400, 401, 402]
      )
      .pipe(
        map((response) => {
          return response.Response.vendorGroups.data.groups.map(
            (vendorGroup) => {
              return {
                vendorGroup: vendorGroup,
                vendorDefinition:
                  this.vendorGroupService.definitions[
                    vendorGroup.vendorGroupHash
                  ]
              };
            }
          );
        }),
        map((vendorGroupDisplays) => {
          return vendorGroupDisplays.sort((a, b) => {
            return compare(
              a.vendorDefinition.order,
              b.vendorDefinition.order,
              true
            );
          });
        })
      );
  }
}
