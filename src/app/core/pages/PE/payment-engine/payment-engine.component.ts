import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { RouterPath } from '../../../../shared/enums/router.enums';
import { paymentEngineLinks } from "../../../../shared/variables/paymentSearchMenu"
import { PaymentEngineMenuLink } from 'src/app/shared/models/PaymentEngineMenu';

@Component({
  selector: 'app-payment-engine',
  templateUrl: './payment-engine.component.html',
  styleUrls: ['./payment-engine.component.scss'],
})
export class PaymentEngine {

  constructor(private authService: AuthService, private router: Router) { }

  paymentMenu = paymentEngineLinks;

  clickMenuLink(paymentLink: PaymentEngineMenuLink) {
    paymentLink.clicked = true;
    if (paymentLink.navigation) {
      this.router.navigate(
        [
          RouterPath.PaymentEngine, 
          paymentLink.navigation
        ], 
        { 
          state: { name: paymentLink.name }, 
          onSameUrlNavigation: "reload" 
        }
      );
    }
  }

  // logout() {
  //   this.authService.logout();
  // }

  // test() {
  //   this.router.navigate([RouterPath.PaymentEngine, RouterPath.Test]);
  // }

}