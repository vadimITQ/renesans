import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { delay, Observable, of, switchMap, tap } from 'rxjs';
import { RouterPath } from '../../../shared/enums/router.enums';
import { RolesService } from './roles.service';
import { UserResponse, UserCredentials } from '../../../shared/models/auth-models';
import { userHasRoles } from '../../../shared/mocks/roles.mock';
import { API_URL } from '../../../shared/variables/http-constants';
import { ToastService } from 'src/app/shared/services/toast.service';
import { ObjectHelper } from 'src/app/shared/classes/object-helper';
import { UserData } from 'src/app/shared/models/init-session';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient, private router: Router, private rolesService: RolesService, private toastService: ToastService) {}

  private _isLoggedIn: boolean = false;

  private _user: UserCredentials | null = null;

  public get isLoggedIn() {
    return this._isLoggedIn;
  }

  public get user(): UserCredentials | null {
    if (this.isLoggedIn){
      return this._user;
    }
    else{
      return null;
    }
  }

  public login(credentials: UserCredentials): Observable<UserResponse | null> {
    return this.authenticateUser(credentials.connectionName, credentials.connectionPassword).pipe(
      tap({
        next: response => {
          this._isLoggedIn = response.auth;
          this.rolesService.userRoles = response.roles;
          this._user = credentials;
          localStorage.setItem('token', response.token);
          localStorage.setItem('userData', JSON.stringify(
            {
              roles: response.roles,
              userName: this._user.connectionName
            } as UserData
          ));
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
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    this.router.navigate([RouterPath.Login]);
  }

  public handleUnauthorized() {
    this.toastService.showWarnToast("Истекло время сессии, авторизуйтесь снова.", "Сообщение");
    this.logout();
    // if (this._user) {
    //   this.login(this._user);
    // } else {
    //   this.logout();
    // }
  }

  private authenticateUser(connectionName: string, connectionPassword: string): Observable<UserResponse> {
    const url = API_URL + '/user';
    return this.http.post<UserResponse>(url, { username: connectionName, password: connectionPassword });
  }

  public initNewSession() {
    const userData: UserData | null = JSON.parse(localStorage.getItem("userData") ?? "{}") ?? null;
    const sessionId = localStorage.getItem("token");
    // window.atob(sessionId?.split(".")[1] ?? "";
    if (ObjectHelper.empty(userData) === false && !!sessionId) {
      this._user = {connectionName: userData!.userName, connectionPassword: ""};
      this._isLoggedIn = true;
      this.rolesService.userRoles = userData!.roles;
    };
  }

  private GET_ALL_ROLES_FOR_TESTING(): void {
    this.rolesService.userRoles = userHasRoles;
  }

  private AUTH_FOR_TESTING(credentials: UserCredentials): Observable<UserResponse> {

    const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0c3RfZnVsbF90ZXN0Iiwicm9sZXMiOiJbXSIsImV4cCI6MTY3OTQ4NzEyNywiaWF0IjoxNjc5NDAwNzI3LCJ1c2VybmFtZSI6InRzdF9mdWxsX3Rlc3QifQ.bn3d5maU3wT1q8YPZe3LmLooMGnw0GgXq5dkAagdeaNcXUJqmtnxszoxI2YP4ItOk8XitnjOxTxKjW28Lmu41Q';
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

}
