import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/pages/login/login.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { TestComponent } from './core/pages/test/test.component';
import { RouterPath } from './shared/enums/router.enums';
import { NotFoundComponent } from './core/pages/not-found/not-found.component';
import { PaymentEngine } from './core/pages/PE/payment-engine/payment-engine.component';
import { MonitoringStandingOrdersComponent } from './core/pages/PE/monitoring-standing-orders/monitoring-standing-orders.component';

const routes: Routes = [
  { path: RouterPath.Login, component: LoginComponent },
  {
    path: RouterPath.PaymentEngine,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: PaymentEngine,
    children: [
      { path: RouterPath.Test, component: TestComponent  },
      { path: RouterPath.MonitoringStandingOrders, component: MonitoringStandingOrdersComponent }
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
