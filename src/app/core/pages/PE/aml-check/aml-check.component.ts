import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { PeRolesService } from 'src/app/core/services/auth/pe-roles.service';

@Component({
  selector: 'app-aml-check',
  templateUrl: './aml-check.component.html',
  styleUrls: ['./aml-check.component.scss'],
})
export class AmlCheckComponent {
  constructor(private peRolesService: PeRolesService, private authService: AuthService, private router: Router) {}

  get hasAccessToComponent(): boolean {
    return this.peRolesService.hasAccessToAmlCheck();
  }

}
