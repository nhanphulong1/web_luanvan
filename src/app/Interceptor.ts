import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './Services/auth.service';

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
});

@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // console.log('Interceptor request', request);

    // if (request.url.includes('/login')) {
    //   return next.handle(request);
    // }
    // if (request.url.includes('/regis')) {
    //     console.log('next');
    //   return next.handle(request);
    // }
    const token = this.authService.getToken();
    if (token) {
      let myHeaders = headers.set('Authorization', 'Bearer ' + token);
      const AuthRequest = request.clone({ headers: myHeaders });
      // console.log('Interceptor headers', myHeaders);
      return next.handle(AuthRequest);
    } else {
      // this.authService.login('/');
      return next.handle(request);
    }
  }
}