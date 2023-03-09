import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, mergeMap, Observable, retry, retryWhen } from 'rxjs';
import { AuthService } from '../../core/services/auth/auth.service';
import { of } from 'rxjs/internal/observable/of';

@Injectable()
export class PeHttpInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const sessionId = localStorage.getItem('SESSION_ID');
    if (sessionId) {
      req.headers.set('SESSION_ID', sessionId);
    }

    return next.handle(req).pipe(
      retry({
        delay: error =>
          error.pipe(
            mergeMap((error: HttpErrorResponse, index) => {
              if (error.status === 401) {
                this.authService.handleUnauthorized();
              }
              if (index < 2) {
                return of(error).pipe(delay(500));
              }

              throw error;
            }),
          ),
      }),
    );
  }
}
