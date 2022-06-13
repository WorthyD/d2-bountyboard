import { Inject, Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { flatMap, map, mergeMap, Observable } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('interceptor');
    return this.authService.getToken$().pipe(
      mergeMap((token) => {
        const authReq = !!token ? this.addToken(req, token.access_token) : req;
        return next.handle(authReq);
      })
    );

    // add the header to the cloned request
    // const authReq = req.clone({
    //   headers: req.headers.set('Authorization', this.appConfig.bungieAPIKey)
    // });

    // return next.handle(authReq);
  }
  addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
