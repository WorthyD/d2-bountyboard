import { Injectable } from '@angular/core';
import { BaseDefinitionService } from './base-definition.service';

import { DestinyDefinitionsDestinyVendorDefinition } from 'bungie-api-angular';

@Injectable({
  providedIn: 'root'
})
export class VendorService extends BaseDefinitionService<DestinyDefinitionsDestinyVendorDefinition> {}
