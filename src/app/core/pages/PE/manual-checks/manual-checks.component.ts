import { Component } from '@angular/core';
import { RolesService } from 'src/app/core/services/auth/roles.service';
import { RolesList } from 'src/app/shared/enums/roles.enums';

@Component({
  selector: 'app-manual-checks',
  templateUrl: './manual-checks.component.html',
  styleUrls: ['./manual-checks.component.scss']
})
export class ManualChecksComponent {

  constructor(private rolesService: RolesService){ }

  get hasAccessToComponent(): boolean {
    return this.rolesService.hasRole(RolesList.ManualChecks);
  }

}
