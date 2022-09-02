import { createSelector, createFeatureSelector } from '@ngrx/store';
import { VendorState } from './vendor.state';

export const selectVendorState = createFeatureSelector<VendorState>('vendors');

export const selectVendors = createSelector(selectVendorState, (state: VendorState) => state);
export const selectVendorsLoading = createSelector(selectVendorState, (state: VendorState) => state.loading);
export const selectVendorsGroups = createSelector(selectVendorState, (state: VendorState) => state.vendorGroups);

export const selectCategories = createSelector(selectVendorState, (state: VendorState) => state.categories);

export const selectVendorCategories = (vendorHash) =>
  createSelector(selectCategories, (state) => state.data[vendorHash]);

export const selectVendorCategoryBounties = (vendorHash, displayCategoryIndex) =>
  createSelector(selectVendorCategories(vendorHash), (state) =>
    state.categories.find((x) => x.displayCategoryIndex === displayCategoryIndex)
  );


export const selectSales = createSelector(selectVendorState, (state: VendorState) => state.sales);
export const selectVendorSales = (vendorHash) =>
  createSelector(selectSales, (state) => state.data[vendorHash]);
