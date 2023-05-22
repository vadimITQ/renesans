import { Injectable } from '@angular/core';
import { RolesService } from './roles.service';
import { ProdRolesList, RolesList } from 'src/app/shared/enums/roles.enums';

@Injectable({
  providedIn: 'root',
})
export class PeRolesService {
  constructor(private rolesService: RolesService) {}

  hasAccessToSearchPayment(): boolean {
    return this.rolesService.hasSomeOfRoles(
      RolesList.AP_TEST_PE_Users,
      RolesList.AP_TEST_PEWeb_ManualChecks,
      ProdRolesList.AP_PEWeb_ManualChecks,
      ProdRolesList.PE_Users,
    );
  }

  hasAccessToManualChecks(): boolean {
    return this.rolesService.hasSomeOfRoles(RolesList.AP_TEST_PEWeb_ManualChecks, ProdRolesList.AP_PEWeb_ManualChecks);
  }

  hasAccessToViewTransferDetails(): boolean {
    return this.rolesService.hasSomeOfRoles(
      RolesList.AP_TEST_PE_Users,
      RolesList.AP_TEST_PEWeb_ManualChecks,
      ProdRolesList.PE_Users,
      ProdRolesList.AP_PEWeb_ManualChecks,
    );
  }

  hasAccessToMonitoringStandingOrders(): boolean {
    return this.rolesService.hasSomeOfRoles(RolesList.AP_TEST_PEWeb_STORDAPP, ProdRolesList.AP_PEWeb_STORDAPP);
  }

  hasAccessToBankOpsCheck(): boolean {
    return this.rolesService.hasSomeOfRoles(RolesList.AP_TEST_PEWeb_BankOps, ProdRolesList.AP_PEWeb_BankOps);
  }

  hasAccessToBankOpsDetails(): boolean {
    return this.hasAccessToBankOpsCheck();
  }

  hasAccessToAmlCheck(): boolean {
    return this.rolesService.hasSomeOfRoles(
      RolesList.AP_TEST_PEWeb_AML,
      ProdRolesList.AP_PEWeb_AML,
      RolesList.AP_TEST_PEWeb_AMLControl,
      ProdRolesList.AP_PEWeb_AMLControl,
    );
  }

  hasAccessToAmlDetails(): boolean {
    return this.hasAccessToAmlCheck();
  }

  hasAccessToSearchOnlyExpired(): boolean {
    return this.rolesService.hasSomeOfRoles(RolesList.AP_TEST_PEWeb_AMLControl, ProdRolesList.AP_PEWeb_AMLControl);
  }
}
