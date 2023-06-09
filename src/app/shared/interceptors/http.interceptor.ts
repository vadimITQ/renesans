import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, mergeMap, Observable, retryWhen } from 'rxjs';
import { AuthService } from '../../core/services/auth/auth.service';
import { of } from 'rxjs/internal/observable/of';
import { ToastService } from '../services/toast.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class PeHttpInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const sessionId = localStorage.getItem('token');

    const headers: { [p: string]: string } = sessionId
      ? {
          ...environment.headers,
          SESSION_ID: sessionId,
        }
      : environment.headers;

    const interceptedReq = req.clone({ setHeaders: { ...headers } });

    return next.handle(interceptedReq).pipe(
      retryWhen(error => {
        return error.pipe(
          mergeMap((err, index) => {
            if (err.status === 401) {
              this.authService.handleUnauthorized();
              throw err;
            }
            if (index < 2) {
              return of(err).pipe(delay(2000));
            }

            // this.toastService.showErrorToast('В данный момент сервис недоступен. Обратитесь в тех. поддержку.')
            throw err;
          }),
        );
      }),
    );
  }
}
