import { Injectable } from '@angular/core';

// import {
//   //  DataService,
//   MilestoneDefinitionService,
//   ActivitiesService,
//   ActivityModeService,
//   PresentationNodeDefinitionService,
// } from '@destiny/data';
import { DataService } from './data.service';
import { VendorService } from '../definition-services/vendor.service';
import { VendorGroupService } from '../definition-services/vendor-group.service';

@Injectable({
  providedIn: 'root'
})
export class ManifestService {
  constructor(
    private data: DataService,
    private vendorService: VendorService, // private activityService: ActivitiesService, // private activityModeService: ActivityModeService, // private milestoneDefinitionService: MilestoneDefinitionService, // private presentationNodeDefinitionService: PresentationNodeDefinitionService
    private vendorGroupService: VendorGroupService
  ) {}

  // TODO: Call for api/settings and look at destiny2CoreSettings
  loadManifest() {
    console.log('loading manifest');
    console.time('loadManifest');
    const tables = [
      //            'DestinyChecklistDefinition',
      //            'DestinyObjectiveDefinition',
      //'DestinyStatDefinition',
      'DestinyVendorDefinition',
      'DestinyVendorGroupDefinition'
      //            'DestinyInventoryItemDefinition',
      //            'DestinyClassDefinition',
      //            'DestinySandboxPerkDefinition',
      //            'DestinyEnergyTypeDefinition',
      //'DestinyCollectibleDefinition',
      //'DestinyPresentationNodeDefinition',
      //'DestinyRecordDefinition',
      //'DestinySeasonDefinition',
      //'DestinySeasonPassDefinition',
      //'DestinyMilestoneDefinition',
      //'DestinyActivityDefinition',
      //'DestinyActivityModeDefinition',
      //            'DestinyPlaceDefinition',
      //            'DestinyFactionDefinition'
    ];
    return this.data
       .loadManifestData('en', tables)
      //.loadManifestData('fr', tables)
      .then((x) => {
        if (x && x.data) {
          if (x.data.DestinyVendorDefinition) {
            this.vendorService.initializeCache(x.data.DestinyVendorDefinition);
          }
          if (x.data.DestinyVendorGroupDefinition) {
            this.vendorGroupService.initializeCache(
              x.data.DestinyVendorGroupDefinition
            );
          }

          // if (x.data.DestinyActivityModeDefinition) {
          //   this.activityModeService.initializeCache(
          //     x.data.DestinyActivityModeDefinition
          //   );
          // }
          // if (x.data.DestinyActivityDefinition) {
          //   this.activityService.initializeCache(
          //     x.data.DestinyActivityDefinition
          //   );
          // }
          // if (x.data.DestinyMilestoneDefinition) {
          //   this.milestoneDefinitionService.initializeCache(
          //     x.data.DestinyMilestoneDefinition
          //   );
          // }
          // if (x.data.DestinyPresentationNodeDefinition) {
          //   this.presentationNodeDefinitionService.initializeCache(
          //     x.data.DestinyPresentationNodeDefinition
          //   );
          // }
        }

        console.timeEnd('loadManifest');
        return true;
      })
      .catch((err: any) => {
        console.error(err);
      });
  }
}
