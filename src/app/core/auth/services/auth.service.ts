import { Injectable } from '@angular/core';
import { getRandomString } from '../../utility/randomString';

const STATE_KEY = 'AUTH_STATE';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authUrl = 'https://www.bungie.net/en/oauth/authorize';
  clientId = '';
  constructor() {}

  redirectToLogin() {
    const authState: string = getRandomString(10);
    localStorage.setItem(STATE_KEY, authState);
    const url: string = `${this.authUrl}?client_id=${this.clientId}&response_type=code&state=${authState}`;
    window.location.href = url;
  }

  getToken(code: string, state: string) {}
}
