import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
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
  private _successToken: string | null = null;

  public get isLoggedIn() {
    return this._isLoggedIn;
  }

  public get successToken() {
    return this._successToken;
  }

  public login(credentials: UserCredentials): Observable<UserResponse | null> {
    return this.AUTH_FOR_TESTING();
    return this.authenticateUser(credentials.connectionName, credentials.connectionPassword).pipe(
      tap({
        next: response => {
          // const cookie = response.headers.get('Set-Cookie');
          console.log(response.headers);
          const cookie = response.headers.get('Access-Control-Allow-Credentials');
          console.log("cookie", cookie);
          const body = response.body as UserResponse;
          this._isLoggedIn = body.auth;
          this.rolesService.userRoles = body.roles;
          // this.rolesService.userRoles = userHasRoles;
          console.log(cookie);
        },
        error: error => {},
      }),
      delay(200),
      switchMap(response => of(response.body)),
    );
  }

  private AUTH_FOR_TESTING(): Observable<UserResponse> {
    this._isLoggedIn = true;
    this.rolesService.userRoles = userHasRoles;
    return of({ auth: true, roles: [] });
  }

  public logout(): void {
    this._isLoggedIn = false;
    this.rolesService.clearRoles();
    this.router.navigate([RouterPath.Login]);
  }

  private saveAuthTokenInStorage() {
    if (this._successToken) {
      localStorage.setItem('successToken', this._successToken);
    }
  }

  private clearToken() {
    if (this._successToken) {
      this._successToken = null;
      localStorage.removeItem('successToken');
    }
  }

  private authenticateUser(connectionName: string, connectionPassword: string): Observable<HttpResponse<any>> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('x-ibm-client-id', '75819d26-bd68-46bb-b9c9-4ce8ca4e4e83');
    headers = headers.append('x-ibm-client-secret', 'uA2yL2hE3qI8oP0sG4xY2hO4wG3iX3lR5pA8nA6mU4kC3bD8hF');
    const url = BASE_URL + '/user';
    return this.http.get(url, { params: { connectionName, connectionPassword }, headers: headers, observe: 'response', withCredentials: true });
  }
}
