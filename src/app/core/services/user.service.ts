import { Injectable } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import {
  UserService as BungieUserService,
  Destiny2Service
} from 'bungie-api-angular';
import { map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private authService: AuthService,
    private bungieUserService: BungieUserService,
    private destinyService: Destiny2Service
  ) {}
  userId$ = this.authService.getMemberId$();

  // TODO cache
  getMembershipInfo$() {
    return this.userId$.pipe(
      switchMap((userId) => {
        return this.bungieUserService
          .userGetMembershipDataForCurrentUser()
          .pipe(
            map((membershipInfo) => {
              if (membershipInfo.Response.destinyMemberships.length > 0) {
                if (membershipInfo.Response.primaryMembershipId) {
                  return membershipInfo.Response.destinyMemberships.find(
                    (dm) =>
                      dm.membershipId ===
                      membershipInfo.Response.primaryMembershipId
                  );
                }
                // return default of no other found.
                return membershipInfo.Response.destinyMemberships[0];
              }
              throw new Error('No memberships found');
            })
          );
      })
    );
  }
  //  [100, 104, 200, 202, 900];

  // 200 Character Info
  // TODO Cache
  getDestinyCharacters$() {
    return this.getMembershipInfo$().pipe(
      switchMap((membershipInfo) => {
        return this.destinyService.destiny2GetProfile(
          membershipInfo.membershipId,
          membershipInfo.membershipType,
          [100, 200]
        );
      }),
      map((memberInfo) => {
        return memberInfo.Response.profile.data.characterIds.map((cId) => {
          return memberInfo.Response.characters.data[cId];
        });
      })
    );
  }
}
