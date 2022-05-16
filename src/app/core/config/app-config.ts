import { Injectable, InjectionToken, ValueProvider } from '@angular/core';

export class AppConfig {
  readonly production: boolean;
  readonly bungieAPIKey: string;
  readonly clientId: string;
  readonly clientSecret: string;
  readonly appVersion: string;
}

// export const APP_CONFIG = new InjectionToken<AppConfig>('application.config');

// export const getAppConfigProvider = (value: AppConfig): ValueProvider => ({
//   provide: APP_CONFIG,
//   useValue: value
// });
