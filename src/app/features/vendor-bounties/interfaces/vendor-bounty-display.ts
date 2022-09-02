import { DestinyDefinitionsDestinyVendorDefinition, DestinyEntitiesVendorsDestinyVendorCategory } from 'bungie-api-angular';

export interface VendorBountyDisplay {
  vendorHash?: number | string;
  vendorDefinition?: DestinyDefinitionsDestinyVendorDefinition;
  vendorBountyIDs?: number[];
}
