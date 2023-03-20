import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { PeRolesService } from 'src/app/core/services/auth/pe-roles.service';

@Component({
  selector: 'app-search-payment',
  templateUrl: './search-payment.component.html',
  styleUrls: ['./search-payment.component.scss'],
})
export class SearchPaymentComponent {
  constructor(private peRolesService: PeRolesService, private authService: AuthService, private router: Router) {}

  get hasAccessToComponent(): boolean {
    return this.peRolesService.hasAccessToSearchPayment();
  }

}
