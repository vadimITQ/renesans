import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RouterPath } from '../../enums/router.enums';

@Injectable({ providedIn: 'root' })
export class AuthService {
  public isLoggedIn: boolean = false;

  constructor(private router: Router) {}

  login() {
    this.isLoggedIn = true;
    this.router.navigate([RouterPath.Home]);
  }

  logout() {
    this.isLoggedIn = false;
    this.router.navigate([RouterPath.Login]);
  }
}
