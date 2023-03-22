import { Injectable } from '@angular/core';
import { RolesService } from './roles.service';
import { RolesList } from 'src/app/shared/enums/roles.enums';

@Injectable({
  providedIn: 'root'
})
export class PeRolesService {

    constructor(private rolesService: RolesService) {}

    hasAccessToSearchPayment(): boolean {
        return true;
    }

    hasAccessToManualChecks(): boolean {
        return this.rolesService.hasSomeOfRoles(RolesList.AP_TEST_PEWeb_ManualChecks, RolesList.AP_PEWeb_ManualChecks)
    }

    hasAccessToViewTransferDetails(): boolean {
        return this.rolesService.hasSomeOfRoles(RolesList.AP_TEST_PEWeb_ManualChecks, RolesList.AP_PEWeb_ManualChecks)
    }

    hasAccessToMonitoringStandingOrders(): boolean {
        return this.rolesService.hasSomeOfRoles(RolesList.AP_TEST_PEWeb_STORDAPP, RolesList.AP_PEWeb_STORDAPP)
    }

}