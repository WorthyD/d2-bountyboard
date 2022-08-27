// Vendor Groups
// Categories <- Get by displayCategoryIndex index comes from manifest
// Sales <-- actual bounties

import { AppState } from '@core/core.state';
import {
  DictionaryComponentResponseOfuint32AndDestinyVendorCategoriesComponent,
  DictionaryComponentResponseOfuint32AndPersonalDestinyVendorSaleItemSetComponent,
  SingleComponentResponseOfDestinyVendorGroupComponent
} from 'bungie-api-angular';

export interface VendorState {
  vendorGroups: SingleComponentResponseOfDestinyVendorGroupComponent;
  categories: DictionaryComponentResponseOfuint32AndDestinyVendorCategoriesComponent;
  sales: DictionaryComponentResponseOfuint32AndPersonalDestinyVendorSaleItemSetComponent;
  loading: boolean;
  loaded: boolean;
  error: string;
}

export const initialVendorState: VendorState = {
  vendorGroups: null,
  categories: null,
  sales: null,
  loading: false,
  loaded: false,
  error: null
};

export interface State extends AppState {
  vendors: VendorState;
}
