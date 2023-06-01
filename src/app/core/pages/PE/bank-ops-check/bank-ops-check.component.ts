import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { PeRolesService } from 'src/app/core/services/auth/pe-roles.service';

@Component({
  selector: 'app-bank-ops-check',
  templateUrl: './bank-ops-check.component.html',
  styleUrls: ['./bank-ops-check.component.scss'],
})
export class BankOpsCheckComponent {
  constructor(private peRolesService: PeRolesService, private authService: AuthService, private router: Router) {}

  get hasAccessToComponent(): boolean {
    return this.peRolesService.hasAccessToBankOpsCheck();
  }

}
