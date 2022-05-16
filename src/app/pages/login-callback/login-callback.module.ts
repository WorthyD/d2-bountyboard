import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginCallbackComponent } from './login-callback.component';
import { LoginRoutingModule } from './login-callback-routing.module';

@NgModule({
  declarations: [LoginCallbackComponent],
  imports: [CommonModule, LoginRoutingModule]
})
export class LoginCallbackModule {}
