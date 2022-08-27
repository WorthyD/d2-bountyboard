import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, Observable, of } from 'rxjs';
import { catchError, switchMap, take, tap } from 'rxjs/operators';
import { loadClanMembers } from '../store/vendor/vendor.actions';

@Injectable({
  providedIn: 'root'
})
export class VendorResolveGuard implements CanActivate {
  constructor(private store: Store<any>) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const { membershipType, membershipId, characterId } = route.params;

    console.log('stuff', route.params);
    if (membershipType && membershipId && characterId) {
      this.store.dispatch(loadClanMembers({ info: { membershipType, membershipId, characterId } }));
      return of(true);
    }
    return of(false);
  }
}
