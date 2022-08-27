import { ActionReducerMap } from '@ngrx/store';
import { VendorEffects } from './store/vendor/vendor.effects';
import { VendorReducer } from './store/vendor/vendor.reducers';
import { VendorState } from './store/vendor/vendor.state';

export const coreEffects = [VendorEffects];
export const coreReducers: ActionReducerMap<AppState> = {
  vendors: VendorReducer
};
export interface AppState {
  vendors: VendorState;
}
