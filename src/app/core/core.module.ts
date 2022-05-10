import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManifestService } from './services/manifest.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

export function initConfig(appConfig: ManifestService) {
  return () => appConfig.loadManifest();
}
@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiKeyInterceptor,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initConfig,
      deps: [ManifestService],
      multi: true,
    },
  ],
})
export class CoreModule {

  // TODO: add initializer thing
}
