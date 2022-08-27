import { createSelector, createFeatureSelector } from '@ngrx/store';
import { VendorState } from './vendor.state';

export const selectVendorState = createFeatureSelector<VendorState>('vendors');

export const selectVendors = createSelector(selectVendorState, (state: VendorState) => state);
export const selectVendorsLoading = createSelector(selectVendorState, (state: VendorState) => state.loading);
export const selectVendorsGroups = createSelector(selectVendorState, (state: VendorState) => state.vendorGroups);

export const selectVendorCategories = (vendorHash) =>
  createSelector(selectVendorState, (state: VendorState) => state.categories.data[vendorHash]);

export const selectVendorCategoryBounties = (vendorHash, displayCategoryIndex) =>
  createSelector(selectVendorCategories(vendorHash), (state) =>
    state.categories.find((x) => x.displayCategoryIndex === displayCategoryIndex)
  );
