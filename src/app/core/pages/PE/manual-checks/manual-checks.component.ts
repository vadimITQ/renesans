import { Component } from '@angular/core';
import { PeRolesService } from 'src/app/core/services/auth/pe-roles.service';

@Component({
  selector: 'app-manual-checks',
  templateUrl: './manual-checks.component.html',
  styleUrls: ['./manual-checks.component.scss'],
})
export class ManualChecksComponent {
  constructor(private peRolesService: PeRolesService) {}

  get hasAccessToComponent(): boolean {
    return this.peRolesService.hasAccessToManualChecks();
  }
}
