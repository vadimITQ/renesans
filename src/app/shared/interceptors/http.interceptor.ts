import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, mergeMap, Observable, retry, retryWhen } from 'rxjs';
import { AuthService } from '../../core/services/auth/auth.service';
import { of } from 'rxjs/internal/observable/of';

@Injectable()
export class PeHttpInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const sessionId = localStorage.getItem('token');

    const headers: { [p: string]: string } = sessionId
      ? {
          'x-ibm-client-id': '75819d26-bd68-46bb-b9c9-4ce8ca4e4e83',
          'x-ibm-client-secret': 'uA2yL2hE3qI8oP0sG4xY2hO4wG3iX3lR5pA8nA6mU4kC3bD8hF',
          SESSION_ID: sessionId,
        }
      : {
          'x-ibm-client-id': '75819d26-bd68-46bb-b9c9-4ce8ca4e4e83',
          'x-ibm-client-secret': 'uA2yL2hE3qI8oP0sG4xY2hO4wG3iX3lR5pA8nA6mU4kC3bD8hF',
        };

    const interceptedReq = req.clone({ setHeaders: { ...headers } });

    return next.handle(interceptedReq).pipe(
      retryWhen(error => {
        return error.pipe(
          mergeMap((error, index) => {
            if (error.status === 401) {
              this.authService.handleUnauthorized();
            }
            if (index < 2) {
              return of(error).pipe(delay(2000));
            }

            throw error;
          }),
        );
      }),
    );
  }
}
