import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  private _userRoles: string[] = [];

  get userRoles(): string[] {
    return this._userRoles;
  }

  set userRoles(roles: string[] | undefined) {
    this._userRoles = roles ?? [];
  }

  public hasRole(role: string): boolean {
    return this._userRoles.some(_role => _role === role);
  }

  public hasRoles(...roles: string[]): boolean {
    return roles.every(role => this.hasRole(role));
  }

  public hasSomeOfRoles(...roles: string[]): boolean {
    return roles.some(role => this.hasRole(role));
  }

  public clearRoles(): void {
    this._userRoles = [];
  }
}
