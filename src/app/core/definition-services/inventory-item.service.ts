import { Injectable } from '@angular/core';
import { BaseDefinitionService } from './base-definition.service';

import { DestinyDefinitionsDestinyInventoryItemDefinition } from 'bungie-api-angular';

@Injectable({
  providedIn: 'root'
})
export class InventoryItemService extends BaseDefinitionService<DestinyDefinitionsDestinyInventoryItemDefinition> {}
