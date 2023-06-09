import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/pages/login/login.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { TestComponent } from './core/pages/test/test.component';
import { RouterPath } from './shared/enums/router.enums';
import { NotFoundComponent } from './core/pages/not-found/not-found.component';
import { PaymentEngineComponent } from './core/pages/PE/payment-engine.component';
import { MonitoringStandingOrdersComponent } from './core/pages/PE/monitoring-standing-orders/monitoring-standing-orders.component';
import { ManualChecksComponent } from './core/pages/PE/manual-checks/manual-checks.component';
import { PaymentEngineRolesGuard } from './shared/guards/payment-engine-roles.guard';
import { SearchPaymentComponent } from './core/pages/PE/search-payment/search-payment.component';
import { ViewTransferDetailsComponent } from './core/pages/PE/view-transfer-details/view-transfer-details.component';
import { BankOpsCheckComponent } from './core/pages/PE/bank-ops-check/bank-ops-check.component';
import { BankOpsDetailsComponent } from './core/pages/PE/bank-ops-details/bank-ops-details.component';

const routes: Routes = [
  { path: RouterPath.Login, component: LoginComponent },
  {
    path: RouterPath.PaymentEngine,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: PaymentEngineComponent,
    children: [
      { path: '', redirectTo: RouterPath.SearchPayment, pathMatch: 'full' },
      { path: RouterPath.Test, component: TestComponent },
      {
        path: RouterPath.MonitoringStandingOrders,
        component: MonitoringStandingOrdersComponent,
        canActivate: [PaymentEngineRolesGuard],
      },
      { path: RouterPath.ManualChecks, component: ManualChecksComponent, canActivate: [PaymentEngineRolesGuard] },
      { path: RouterPath.SearchPayment, component: SearchPaymentComponent, canActivate: [PaymentEngineRolesGuard] },
      { path: `${RouterPath.ViewTransferDetails}/:id`, component: ViewTransferDetailsComponent, canActivate: [PaymentEngineRolesGuard] },
      { path: RouterPath.BankOpsCheck, component: BankOpsCheckComponent, canActivate: [PaymentEngineRolesGuard] },
      { path: `${RouterPath.BankOpsDetails}/:id`, component: BankOpsDetailsComponent, canActivate: [PaymentEngineRolesGuard] },
    ],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: RouterPath.PaymentEngine,
  },
  { path: RouterPath.NotFound, component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
