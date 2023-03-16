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
    // return this.AUTH_FOR_TESTING(credentials);
    return this.authenticateUser(credentials.connectionName, credentials.connectionPassword).pipe(
      tap({
        next: response => {
          console.log(response);
          this._isLoggedIn = response.auth;
          this.rolesService.userRoles = response.roles;
          this._user = credentials;
          localStorage.setItem('token', response.token);
          this.rolesService.userRoles = userHasRoles;
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
    return this.http.post<UserResponse>(url, { username: connectionName, password: connectionPassword });
  }

  private AUTH_FOR_TESTING(credentials: UserCredentials): Observable<UserResponse> {

    const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJoZXJtZXMiLCJyb2xlcyI6IltdIiwiZXhwIjoxNjc4Nzc0ODQzLCJpYXQiOjE2Nzg2ODg0NDMsInVzZXJuYW1lIjoiaGVybWVzIn0.ZTpxWEsP2HcDY_tE4q5_-I45cFA8isM9brL6WUXm76FjMdHgTw-qVG6G02Q_PxRFeHCHmLHHzK_5L2vb1PbqAw';
    // localStorage.setItem('token', token);
    this._isLoggedIn = true;
    this._user = credentials;
    this.rolesService.userRoles = userHasRoles;
    return of({
      auth: true,
      roles: [],
      token,
    });

    return this.authenticateUser("tst_full_test", "yiqH9iR5").pipe(
      tap({
        next: response => {
          console.log(response);
          this._isLoggedIn = response.auth;
          this.rolesService.userRoles = userHasRoles;
          this._user = credentials;
          localStorage.setItem('token', response.token);
        },
        error: error => {},
      }),
      delay(200),
    );
  }

  public handleUnauthorized() {
    console.log('unauthorized', this._user);
    if (this._user) {
      this.login(this._user);
    } else {
      this.logout();
    }
  }
}
