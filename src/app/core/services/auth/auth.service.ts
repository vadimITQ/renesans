import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { delay, Observable, of, switchMap, tap } from 'rxjs';
import { RouterPath } from '../../../shared/enums/router.enums';
import { RolesService } from './roles.service';
import { UserResponse, UserCredentials } from '../../../shared/models/auth-models';
import { userHasRoles } from '../../../shared/mocks/roles.mock';
import { BASE_URL } from '../../../shared/variables/http-constants';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient, private router: Router, private rolesService: RolesService) {}

  private _isLoggedIn: boolean = false;

  private _user: UserCredentials | null = null;

  public get isLoggedIn() {
    return this._isLoggedIn;
  }

  public login(credentials: UserCredentials): Observable<UserResponse | null> {
    return this.AUTH_FOR_TESTING();
    return this.authenticateUser(credentials.connectionName, credentials.connectionPassword).pipe(
      tap({
        next: response => {
          // const cookie = response.headers.get('Cookie');
          console.log(response);
          this._isLoggedIn = response.auth;
          this.rolesService.userRoles = response.roles;
          this._user = credentials;
          localStorage.setItem('token', response.token);
          // this.rolesService.userRoles = userHasRoles;
        },
        error: error => {},
      }),
      delay(200),
    );
  }

  public logout(): void {
    this._isLoggedIn = false;
    this._user = null;
    this.rolesService.clearRoles();
    this.router.navigate([RouterPath.Login]);
  }

  private authenticateUser(connectionName: string, connectionPassword: string): Observable<UserResponse> {
    const url = BASE_URL + '/user';
    return this.http.get<UserResponse>(url, {
      params: { connectionName, connectionPassword },
    });
  }

  private AUTH_FOR_TESTING(): Observable<UserResponse> {
    this._isLoggedIn = true;
    this.rolesService.userRoles = userHasRoles;
    return of({
      auth: true,
      roles: [],
      token:
        'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJoZXJtZXMiLCJyb2xlcyI6IltdIiwiZXhwIjoxNjc4NDM1ODc1LCJpYXQiOjE2NzgzNDk0NzUsInVzZXJuYW1lIjoiaGVybWVzIn0.JTGZgnRpeL4s7Vg8SqhVIV2-8EBFXUBxXTQOpxaLFz3jsuHYQe0RN8DoEf59vJoBpK4NOn8XH2T5BBkpDqxs8w',
    });
  }

  public handleUnauthorized() {
    if (this._user) {
      this.login(this._user);
    } else {
      this.logout();
    }
  }
}
