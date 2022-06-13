import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpBackend
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from '@core/config/app-config';
import { catchError, Observable, of, ReplaySubject } from 'rxjs';
import { map, take } from 'rxjs';
import { getRandomString } from '../../utility/randomString';
import { Token, AuthInfo } from '../interfaces';

const STATE_KEY = 'AUTH_STATE';
const AUTH_KEY = 'bounty-board__auth-key';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly authUrl = 'https://www.bungie.net/en/oauth/authorize';
  readonly tokenUrl = 'https://www.bungie.net/platform/app/oauth/token/';
  token!: Token | null;

  private authSubject = new ReplaySubject();
  public authInfo$!: Observable<AuthInfo>;
  private httpClient: HttpClient;
  constructor(private httpBackend: HttpBackend, private appConfig: AppConfig) {
    this.httpClient = new HttpClient(httpBackend);
  }

  clientId = this.appConfig.clientId;
  redirectToLogin() {
    const authState: string = getRandomString(10);
    localStorage.setItem(STATE_KEY, authState);
    const url: string = `${this.authUrl}?client_id=${this.clientId}&response_type=code&state=${authState}`;
    window.location.href = url;
  }

  getTokenFromAPI(code: string, state: string) {
    const storedState: string = localStorage.getItem(STATE_KEY) || '';
    if (storedState !== '' && storedState !== state) {
      localStorage.removeItem(STATE_KEY);
      throw new Error('Stored state did not match query string state');
    }

    // HTTP interceptor will get api key
    let params = new HttpParams();
    params = params.set('grant_type', 'authorization_code');
    params = params.set('client_id', this.clientId);
    params = params.set('code', code);

    this.httpClient
      .post(this.tokenUrl, params, this.getHeaders())
      .pipe(
        take(1),
        map((result) => {
          this.saveToken(result as Token, true);
        }),
        catchError((error) => {
          throw error;
        })
      )
      .subscribe();
  }

  private getHeaders() {
    let headers = new HttpHeaders();
    return {
      headers: headers
        .set('x-api-key', this.appConfig.bungieAPIKey)
        .set(
          'authorization',
          `Basic ${btoa(
            `${this.appConfig.clientId}:${this.appConfig.clientSecret}`
          )}`
        )
    };
  }

  getRefreshTokenFromAPI$(): Observable<Token> {
    const refreshToken = this.token.refresh_token;
    let params = new HttpParams();
    params = params.set('grant_type', 'refresh_token');
    params = params.set('client_id', this.appConfig.clientId);
    params = params.set('refresh_token', refreshToken);
    console.log('refreshing');
    return this.httpClient.post(this.tokenUrl, params, this.getHeaders()).pipe(
      map((result) => {
        console.log('refreshing2');
        this.saveToken(result as Token, true);
        return result as Token;
      })
    );
  }

  getToken$(): Observable<Token> {
    let loadedFromLocal = false;
    if (this.token === null || this.token === undefined) {
      console.log('getting token from local storage');
      this.token = this.getTokenFromLocalStorage();
      loadedFromLocal = true;
    }
    if (this.token) {
      if (this.isTokenValid()) {
        console.log('token is valid');
        if (loadedFromLocal) {
          this.saveToken(this.token);
        }
        return of(this.token);
      }

      if (this.isRefreshTokenValid()) {
        console.log('logging refresh token');
        return this.getRefreshTokenFromAPI$();
      }

      // TODO: Refresh token?
      throw new Error('Invalid token signing out');
      this.signOut();
    }

    return of(null);
  }

  getMemberId$(): Observable<string> {
    return this.getToken$().pipe(
      map((token) => {
        console.log('token', token);
        if (token) {
          return token.membership_id;
        }
        return '';
      })
    );
  }

  isLoggedIn$(): Observable<boolean> {
    return this.getToken$().pipe(
      map((token) => {
        console.log('token', token);
        return token !== null;
      })
    );
  }

  isTokenValid() {
    const now: number = new Date().getTime();
    return now < this.token?.expiration;
  }
  isRefreshTokenValid() {
    const now: number = new Date().getTime();
    return now < this.token?.refreshExpiration;
  }
  signOut() {
    localStorage.removeItem(AUTH_KEY);
    this.token = null;
    this.update();
  }

  private saveToken(newToken: Token, addTimeStamps: boolean = false) {
    if (addTimeStamps) {
      newToken = this.addTokenTimestamps(newToken);
    }
    localStorage.setItem(AUTH_KEY, JSON.stringify(newToken));
    this.token = newToken;
    this.update();
  }

  private getTokenFromLocalStorage(): Token | null {
    try {
      const storedToken = localStorage.getItem(AUTH_KEY);
      if (storedToken) {
        return JSON.parse(storedToken);
      }
    } catch (error) {
      localStorage.removeItem(AUTH_KEY);
    }
    return null;
  }

  private update() {
    if (this.token) {
      const newAuthInfo: AuthInfo = {
        accessToken: this.token.access_token,
        memberId: this.token.membership_id
      };
      this.authSubject.next(newAuthInfo);
    } else {
      this.authSubject.next(null);
    }
  }

  private addTokenTimestamps(t: Token) {
    t.creation = new Date().getTime();
    t.expiration = t.expires_in * 1000 + t.creation;
    t.refreshExpiration = t.refresh_expires_in * 1000 + t.creation;
    return t;
  }
}
