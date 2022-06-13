import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CanActivateRouteGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate() {
    console.log('guard')
    return this.authService.isLoggedIn$().pipe(
      map((isLoggedIn) => {
        if (!isLoggedIn) {
          return this.router.parseUrl('/login');
        } else {
          return true;
        }
      })
    );
  }
}
