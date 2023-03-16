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
          'x-ibm-client-id': 'f3beca6f-d9ec-432d-ba61-3122de09f4d9',
          'x-ibm-client-secret': 'aL6uX7kN7vG1qP3nO6gV2vE2cA0mA1wC1rI4cS4vG6kR0nX7uV',
          SESSION_ID: sessionId
        }
      : {
          'x-ibm-client-id': 'f3beca6f-d9ec-432d-ba61-3122de09f4d9',
          'x-ibm-client-secret': 'aL6uX7kN7vG1qP3nO6gV2vE2cA0mA1wC1rI4cS4vG6kR0nX7uV',
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
