import { createAction, props } from '@ngrx/store';
import {
  DictionaryComponentResponseOfuint32AndDestinyVendorCategoriesComponent,
  DictionaryComponentResponseOfuint32AndPersonalDestinyVendorSaleItemSetComponent,
  SingleComponentResponseOfDestinyVendorGroupComponent
} from 'bungie-api-angular';
const base = '[Vendors] - ';

interface loadClanProps {
  characterId: number | string;
  membershipId: number | string;
  membershipType: number | string;
}

export const loadClanMembers = createAction(
  `${base} Load vendors`,
  props<{
    info: loadClanProps;
  }>()
);

export const loadClanMembersSuccess = createAction(
  `${base} Load vendors success`,
  props<{
    vendorGroups: SingleComponentResponseOfDestinyVendorGroupComponent;
    categories: DictionaryComponentResponseOfuint32AndDestinyVendorCategoriesComponent;
    sales: DictionaryComponentResponseOfuint32AndPersonalDestinyVendorSaleItemSetComponent;
  }>()
);
