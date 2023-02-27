import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { LoginComponent } from './core/pages/login/login.component';
import { PaymentEngine } from './core/pages/PE/payment-engine/payment-engine.component';
import { TestComponent } from './core/pages/test/test.component';
import { NotFoundComponent } from './core/pages/not-found/not-found.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModuleModule } from './shared/modules/shared-module/shared-module.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { CalendarModule } from 'primeng/calendar';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MonitoringStandingOrdersComponent } from './core/pages/PE/monitoring-standing-orders/monitoring-standing-orders.component';
import { MonitoringStandingOrdersFilterComponent } from './core/pages/PE/monitoring-standing-orders/monitoring-standing-orders-filter/monitoring-standing-orders-filter.component';
import { NumberOfOrdersTableComponent } from './core/pages/PE/monitoring-standing-orders/number-of-orders-table/number-of-orders-table.component';
import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LoadingSpinnerComponent } from './shared/components/loading-spinner/loading-spinner.component';
import { TransferPaymentHistoryByStatusTableComponent } from './core/pages/PE/monitoring-standing-orders/transfer-payment-history-by-status-table/transfer-payment-history-by-status-table.component';
import { DatePipe } from '@angular/common';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MonitoringStandingOrdersGuard } from 'src/app/shared/guards/monitoring-standing-orders.guard';
import { ManualChecksComponent } from './core/pages/PE/manual-checks/manual-checks.component';
import { PaymentEngineRolesGuard } from './shared/guards/payment-engine-roles.guard';
import { ManualChecksFilterComponent } from './core/pages/PE/manual-checks/manual-checks-filter/manual-checks-filter.component';
import { ManualChecksResultComponent } from './core/pages/PE/manual-checks/manual-checks-result/manual-checks-result.component';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ClickToDirective } from './shared/directives/click-to.directive';
import { PeInputComponent } from './shared/components/controls/pe-input/pe-input.component';

@NgModule({
  declarations: [
    AppComponent, 
    PaymentEngine, 
    LoginComponent, 
    TestComponent, 
    NotFoundComponent, 
    MonitoringStandingOrdersComponent, 
    MonitoringStandingOrdersFilterComponent, 
    NumberOfOrdersTableComponent, 
    NumberOfOrdersTableComponent, 
    LoadingSpinnerComponent, 
    TransferPaymentHistoryByStatusTableComponent, 
    ManualChecksComponent, 
    ManualChecksFilterComponent, 
    ManualChecksResultComponent,
    ClickToDirective,
    PeInputComponent
  ],
  imports: [
    BrowserModule, 
    ReactiveFormsModule,
    AppRoutingModule,
    SharedModuleModule,
    BrowserAnimationsModule,
    CalendarModule,
    ToastModule,
    TableModule,
    HttpClientModule,
    ProgressSpinnerModule,
    ConfirmDialogModule,
    DropdownModule,
    InputTextModule
  ],
  providers: [
    AuthGuard, 
    DatePipe, 
    MessageService, 
    ConfirmationService, 
    MonitoringStandingOrdersGuard, 
    PaymentEngineRolesGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
