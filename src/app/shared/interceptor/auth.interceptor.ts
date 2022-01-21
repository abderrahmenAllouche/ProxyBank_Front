import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { AuthService } from '../service/auth.service';
import { of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap((evt) => {}),
      catchError((err: any) => {
        if (
          err instanceof HttpErrorResponse &&
          (err.status == 403 || err.status == 401)
        ) {
          this.authService.logout();
        }
        return of(err);
      })
    );
  }
}
