import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Inject, Injectable } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';
import { PeNavigationService } from 'src/app/core/services/pe-navigation/pe-navigation.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject(AuthService) private authService: AuthService, private peNavigationService: PeNavigationService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.authService.isLoggedIn) {
      this.peNavigationService.goToLogin();
    }
    return this.authService.isLoggedIn;
  }

  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(next, state);
  }
}
