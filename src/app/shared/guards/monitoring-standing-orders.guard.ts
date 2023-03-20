
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { RolesService } from '../../core/services/auth/roles.service';
import { RolesList } from '../enums/roles.enums';
import { ToastService } from '../services/toast.service';

@Injectable()
export class MonitoringStandingOrdersGuard implements CanActivate {
    
    constructor(private rolesService: RolesService, private toastService: ToastService) {}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.rolesService.hasRoles(RolesList.AP_PEWeb_STORDAPP, RolesList.AP_TEST_PEWeb_STORDAPP)) {
            return true;
        }
        else{
            this.toastService.showErrorToast("Нет прав на взаимодействие с формой «Мониторинг распоряжений на регулярные переводы/платежи»");
            return false;
        }
    }

}