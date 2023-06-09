import { Component } from '@angular/core';
import { paymentEngineLinks } from '../../../shared/variables/payment-search-menu';
import { PaymentEngineMenuLink } from 'src/app/shared/models/payment-engine-menu';
import { PeNavigationService } from 'src/app/core/services/pe-navigation/pe-navigation.service';

@Component({
  selector: 'app-payment-engine',
  templateUrl: './payment-engine.component.html',
  styleUrls: ['./payment-engine.component.scss'],
})
export class PaymentEngineComponent {
  constructor(private peNavigationService: PeNavigationService) {}

  paymentMenu = paymentEngineLinks;

  clickMenuLink(paymentLink: PaymentEngineMenuLink) {
    paymentLink.clicked = true;
    if (paymentLink.navigation) {
      this.peNavigationService.goToSpecificPath([paymentLink.navigation], {
        state: { name: paymentLink.name },
        onSameUrlNavigation: 'reload',
      });
    }
  }
}
