
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { RouterPath } from '../enums/router.enums';
import { ToastService } from '../services/toast.service';
import { PeRolesService } from 'src/app/core/services/auth/pe-roles.service';

@Injectable()
export class PaymentEngineRolesGuard implements CanActivate {

    constructor(private peRolesService: PeRolesService, private toastService: ToastService) {}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        switch(next?.url?.join("/") ?? ""){
            case(RouterPath.SearchPayment): {
                if (this.peRolesService.hasAccessToSearchPayment()){
                    return true;
                }
                else{
                    this.toastService.showErrorToast("Нет прав на взаимодействие с формой «Поиск платежей»");
                    return false;
                }
            }
            case(RouterPath.ManualChecks): {
                if (this.peRolesService.hasAccessToManualChecks()){
                    return true;
                }
                else{
                    this.toastService.showErrorToast("Нет прав на взаимодействие с формой «Ручной разбор ошибочных переводов/платежей»");
                    return false;
                }
            }
            case(RouterPath.ViewTransferDetails): {
                if (this.peRolesService.hasAccessToViewTransferDetails()){
                    return true;
                }
                else{
                    this.toastService.showErrorToast("Нет прав на взаимодействие с формой «Просмотр деталей по переводу/платежу»");
                    return false;
                }
            }
            case(RouterPath.MonitoringStandingOrders): {
                if (this.peRolesService.hasAccessToMonitoringStandingOrders()){
                    return true;
                }
                else {
                    this.toastService.showErrorToast("Нет прав на взаимодействие с формой «Мониторинг распоряжений на регулярные переводы/платежи»");
                    return false;
                }
            }
            case(RouterPath.BankOpsCheck):
            case(RouterPath.BankOpsDetails): {
                if (this.peRolesService.hasAccessToBankOpsCheck()){
                    return true;
                }
                else {
                    this.toastService.showErrorToast("Нет прав на взаимодействие с формой «BankOps проверка»");
                    return false;
                }
            }
            case(RouterPath.AntiFraudCheck):
            case(RouterPath.AntiFraudDetails): {
                if (this.peRolesService.hasAccessToAntiFraudCheck()){
                    return true;
                }
                else {
                    this.toastService.showSuccessToast("Нет прав на взаимодействие с формой «AntiFraud проверка»");
                    return false;
                }
            }

            case(RouterPath.AmlCheck):
            case(RouterPath.AmlDetails): {
                if (this.peRolesService.hasAccessToAmlCheck()){
                    return true;
                }
                else {
                    this.toastService.showErrorToast("Нет прав на взаимодействие с формой «AML проверка»");
                    return false;
                }
            }
        }
        return true;
    }

}
