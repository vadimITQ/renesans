import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-payment',
  templateUrl: './search-payment.component.html',
  styleUrls: ['./search-payment.component.scss'],
})
export class SearchPaymentComponent {
  constructor(private authService: AuthService, private router: Router) {}
}
