
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { RolesService } from '../../core/services/auth/roles.service';
import { ToastService } from '../services/toast.service';

@Injectable()
export class MonitoringStandingOrdersGuard implements CanActivate {
    
    constructor(private rolesService: RolesService, private toastService: ToastService) {}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.rolesService.hasRole("AP.STORDAPP")) {
            return true;
        }
        else{
            this.toastService.showErrorToast("Нет прав на взаимодействие с формой «Мониторинг распоряжений на регулярные переводы/платежи»");
            return false;
        }
    }

}