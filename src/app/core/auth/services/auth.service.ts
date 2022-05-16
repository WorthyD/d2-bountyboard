import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

  constructor(private httpClient: HttpClient, private appConfig: AppConfig) {}

  clientId = this.appConfig.clientId;
  redirectToLogin() {
    const authState: string = getRandomString(10);
    localStorage.setItem(STATE_KEY, authState);
    const url: string = `${this.authUrl}?client_id=${this.clientId}&response_type=code&state=${authState}`;
    window.location.href = url;
  }

  getTokenFromAPI(code: string, state: string) {
    const storedState: string = localStorage.getItem(STATE_KEY) || '';
    console.log('stored', storedState);
    console.log('state', state);
    if (storedState !== '' && storedState !== state) {
      localStorage.removeItem(STATE_KEY);
      throw new Error('Stored state did not match query string state');
    }

    let headers = new HttpHeaders();
    const httpOptions = {
      headers: headers
        .set('x-api-key', this.appConfig.bungieAPIKey)
        .set(
          'authorization',
          `Basic ${btoa(
            `${this.appConfig.clientId}:${this.appConfig.clientSecret}`
          )}`
        )
    };

    // HTTP interceptor will get api key
    let params = new HttpParams();
    params = params.set('grant_type', 'authorization_code');
    params = params.set('client_id', this.clientId);
    params = params.set('code', code);

    this.httpClient
      .post(this.tokenUrl, params, httpOptions)
      .pipe(
        take(1),
        map((result) => {
          console.log('post result', result);
          this.saveToken(result as Token);
        }),
        catchError((error) => {
          console.log(error);

          throw error;
        })
      )
      .subscribe();
  }

  getToken(): Observable<Token | null> {
    let loadedFromLocal = false;
    if (this.token === null) {
      this.token = this.getTokenFromLocalStorage();
      loadedFromLocal = true;
    }
    if (this.token) {
      if (this.isTokenValid()) {
        if (loadedFromLocal) {
          this.saveToken(this.token);
        }
        return of(this.token);
      }
      // TODO: Refresh token?
      //throw new Error('Invalid token');
      this.signOut();
    }

    return of(null);
  }

  getMemberId(): Observable<string> {
    return this.getToken().pipe(
      map((token) => {
        if (token) {
          return token.membership_id;
        }
        return '';
      })
    );
  }

  isTokenValid() {
    const now: number = new Date().getTime();
    return now < this.token?.expiration;
  }

  signOut() {
    localStorage.removeItem(AUTH_KEY);
    this.token = null;
    this.update();
  }

  private saveToken(newToken: Token, addTimeStamps: boolean = false) {
    if (addTimeStamps) {
      this.addTokenTimestamps(newToken);
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
  }
}