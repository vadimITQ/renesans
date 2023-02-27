
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { RolesService } from '../../core/services/auth/roles.service';
import { RouterPath } from '../enums/router.enums';
import { ToastService } from '../services/toast.service';
import { RolesList } from '../enums/roles.enums';

@Injectable()
export class PaymentEngineRolesGuard implements CanActivate {
    
    constructor(private rolesService: RolesService, private toastService: ToastService) {}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        switch(next?.url?.join("/") ?? ""){
            case(RouterPath.ManualChecks): {
                if (this.rolesService.hasRole(RolesList.ManualChecks)){
                    return true;
                }
                else{
                    this.toastService.showErrorToast("Нет прав на взаимодействие с формой «Ручной разбор ошибочных переводов/платежей»");
                    return false;
                }
            }
            case(RouterPath.MonitoringStandingOrders): {
                if (this.rolesService.hasRole(RolesList.STORDAPP)){
                    return true;
                }
                else {
                    this.toastService.showErrorToast("Нет прав на взаимодействие с формой «Мониторинг распоряжений на регулярные переводы/платежи»");
                    return false;
                }
            }
        }
        return true;
    }

}