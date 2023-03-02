import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor() { }

  private _userRoles: string[] = [];

  get userRoles(): string[]{
    return this._userRoles;
  }

  set userRoles(roles: string[] | undefined){
    this._userRoles = roles ?? [];
  }

  hasRole(role: string): boolean {
    return this._userRoles.some(_role => _role === role);
  }

  clearRoles(): void {
    this._userRoles = [];
  }
 
}
