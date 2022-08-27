import { createReducer, on } from '@ngrx/store';
import { VendorState, initialVendorState } from './vendor.state';
import { loadClanMembers, loadClanMembersSuccess } from './vendor.actions';

export const VendorReducer = createReducer(
  initialVendorState,
  on(loadClanMembers, (state) => ({
    ...state,
    loading: true
  })),
  on(loadClanMembersSuccess, (state, { vendorGroups, categories, sales }) => ({
    ...state,
    vendorGroups,
    categories,
    sales,
    loading: false
  }))
);
