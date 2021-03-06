import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Destiny2Service } from 'bungie-api-angular';
import { ManifestDatabaseService } from './manifest-database.service';

import { CachedManifest } from '../models/CachedManifest';
import { nowPlusMinutes } from '../utility/date-utils';

export const STATUS_EXTRACTING_TABLES = 'extracting tables';
export const STATUS_UNZIPPING = 'unzipping';
export const STATUS_DONE = 'done';
const MANIFEST_PATH_KEY = 'MANIFEST_PATH_KEY';
const MANIFEST_PATH_EXP_KEY = 'MANIFEST_PATH_EXP_KEY';
const MANIFEST_DATABASE_NAME = 'bounty-board-manifest';

const VERSION = 'v1';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(
    private d2service: Destiny2Service,
    private db: ManifestDatabaseService
  ) {}

  private getManifestFromCache(language: string) {
    const jsonPath = window.localStorage.getItem(MANIFEST_PATH_KEY);
    const jsonPathExp = window.localStorage.getItem(MANIFEST_PATH_EXP_KEY);
    if (jsonPathExp && jsonPath) {
      const jsonDate = new Date(jsonPathExp);
      if (jsonDate < nowPlusMinutes(-60)) {
        return of(jsonPath);
      }
    }
    return this.getManifest(language).pipe(
      map((x) => {
        window.localStorage.setItem(MANIFEST_PATH_KEY, x);
        window.localStorage.setItem(
          MANIFEST_PATH_EXP_KEY,
          new Date().toString()
        );
        return x;
      })
    );
  }

  private getManifest(language: string) {
    return this.d2service.destiny2GetDestinyManifest().pipe(
      map((response) => {
        return response?.Response?.jsonWorldContentPaths?.[language] || '';
      })
    );
  }

  pruneTables(obj: any, keys: any) {
    if (!keys.length) {
      return obj;
    }

    return keys.reduce((acc: any, key: any) => {
      return {
        ...acc,
        [key]: obj[key]
      };
    }, {});
  }

  requestDefinitionsArchive(dbPath: any, tableNames: any) {
    // TODO This takes about a second and a half to execute
    return this.db.getValues(MANIFEST_DATABASE_NAME).then((cachedValue) => {
      const versionKey = `${VERSION}:${dbPath}`;

      if (
        cachedValue &&
        cachedValue.length > 0 &&
        cachedValue.find((x) => x.id === versionKey)
      ) {
        this.db.closeDatabase(MANIFEST_DATABASE_NAME);
        return cachedValue.find((x) => x.id === versionKey);
      }

      return fetch(`https://www.bungie.net${dbPath}`).then((x) => {
        return x.json().then((y) => {
          const prunedTables = this.pruneTables(y, tableNames);
          const dbObject = { id: versionKey, data: prunedTables };
          this.db
            .update(MANIFEST_DATABASE_NAME, 'allData', [dbObject])
            .then((db) => {
              this.db.closeDatabase(MANIFEST_DATABASE_NAME);
            });

          return dbObject;
        });
      });
    });
  }

  public loadManifestData(
    language: string = 'en',
    tableNames: any
  ): Promise<CachedManifest> {
    return this.getManifestFromCache(language)
      .toPromise()
      .then((path) => this.requestDefinitionsArchive(path, tableNames));
  }
}
