import { Injectable } from '@angular/core';
import { BaseDefinitionService } from './base-definition.service';

import { DestinyDefinitionsDestinyVendorGroupDefinition } from 'bungie-api-angular';

@Injectable({
  providedIn: 'root'
})
export class VendorGroupService extends BaseDefinitionService<DestinyDefinitionsDestinyVendorGroupDefinition> {}
