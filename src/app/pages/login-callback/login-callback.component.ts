import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@core/auth/services/auth.service';

@Component({
  selector: 'app-login-callback',
  templateUrl: './login-callback.component.html',
  styleUrls: ['./login-callback.component.scss']
})
export class LoginCallbackComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const code: string = this.route.snapshot.queryParamMap.get('code') || '';
    const state: string = this.route.snapshot.queryParamMap.get('state') || '';
    this.authService.getTokenFromAPI(code, state);
  }
}
