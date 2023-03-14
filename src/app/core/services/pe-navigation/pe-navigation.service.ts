import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { RouterPath } from '../../../shared/enums/router.enums';
import { AuthService } from '../auth/auth.service';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PeNavigationService {

  constructor(
    private router: Router,
    private authService: AuthService,
    private location: Location
  ) { }

  public goToSpecificPath(path: string[], extras?: NavigationExtras | undefined) {
    this.router.navigate([RouterPath.PaymentEngine, ...path], extras);
  }

  public goToHome(){
    this.goToSearchPayment();
  }

  public goToLogin(logOut?: boolean){
    logOut 
      ? this.authService.logout()
      : this.router.navigate([RouterPath.Login]);
  }

  public goBack(){
    this.location.back();
  }

  public goToManualChecks(){
    this.goToSpecificPath([RouterPath.ManualChecks]);
  }

  public goToSearchPayment(){
    this.goToSpecificPath([RouterPath.SearchPayment]);
  }

  public goToViewTransferDetails(id: number | string) {
    this.goToSpecificPath([RouterPath.ViewTransferDetails, '' + id])
  }

}
