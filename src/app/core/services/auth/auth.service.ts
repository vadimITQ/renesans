import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, tap } from 'rxjs';
import { RouterPath } from '../../../shared/enums/router.enums';
import { RolesService } from './roles.service';
import { userHasRoles, userNoRoles } from '../../../shared/mocks/roles.mock';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private http: HttpClient, private router: Router, private rolesService: RolesService) { }

  private _isLoggedIn: boolean = false;
  private _successToken: string | null = null;

  public get isLoggedIn(){
    return this._isLoggedIn;
  }

  public get successToken() {
    return this._successToken;
  }

  public login(): Observable<any> {
    this._isLoggedIn = true;
    this.rolesService.userRoles = userHasRoles;
    // this.rolesService.userRoles = userNoRoles;
    return of({ token: "token", success: true }).pipe(tap(response => this._successToken = response.token));
  }

  public logout(): void {
    this._isLoggedIn = false;
    this.rolesService.userRoles = userHasRoles;
    this.router.navigate([RouterPath.Login]);
  }

  private saveAuthTokenInStorage() {
    if (this._successToken){
      localStorage.setItem("successToken", this._successToken);
    }
  }

  private clearToken() {
    if (this._successToken){
      this._successToken = null;
      localStorage.removeItem("successToken");
    }
  }
  
}
