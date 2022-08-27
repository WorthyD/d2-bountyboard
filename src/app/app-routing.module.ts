import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateRouteGuard,  } from '@core/guards/is-logged-in.guard';
import { VendorResolveGuard } from '@core/guards/vendors-resolve.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [CanActivateRouteGuard],
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule)
  },
  {
    path: ':membershipType/:membershipId/:characterId',
    canActivate: [CanActivateRouteGuard, VendorResolveGuard],
    loadChildren: () =>
      import('./pages/vendors/vendors.module').then((m) => m.VendorsModule)
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginModule)
  },
  {
    path: 'login-callback',
    loadChildren: () =>
      import('./pages/login-callback/login-callback.module').then(
        (m) => m.LoginCallbackModule
      )
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
