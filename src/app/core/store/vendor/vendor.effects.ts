import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Destiny2Service } from 'bungie-api-angular';
import { loadClanMembers, loadClanMembersSuccess } from './vendor.actions';
import { map, switchMap } from 'rxjs/operators';

@Injectable()
export class VendorEffects {
  constructor(private actions$: Actions, private destiny2Service: Destiny2Service) {}

  loadVendors$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadClanMembers),
      switchMap(({ info }) => {
        return this.destiny2Service
          .destiny2GetVendors(
            info.characterId as number,
            info.membershipId as number,
            info.membershipType as number,
            [400, 401, 402]
          )
          .pipe(
            map((data) => {
              return loadClanMembersSuccess({
                categories: data.Response.categories,
                sales: data.Response.sales,
                vendorGroups: data.Response.vendorGroups
              });
            })
          );
      })
    );
  });
}
