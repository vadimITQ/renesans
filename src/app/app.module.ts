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
import { MessageService } from 'primeng/api';
import { MonitoringStandingOrdersComponent } from './core/pages/PE/monitoring-standing-orders/monitoring-standing-orders.component';
import { MonitoringStandingOrdersFilterComponent } from './core/pages/PE/monitoring-standing-orders/monitoring-standing-orders-filter/monitoring-standing-orders-filter.component';
import { NumberOfOrdersTableComponent } from './core/pages/PE/monitoring-standing-orders/number-of-orders-table/number-of-orders-table.component';
import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LoadingSpinnerComponent } from './shared/components/loading-spinner/loading-spinner.component';

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
    LoadingSpinnerComponent
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
    ProgressSpinnerModule
  ],
  providers: [AuthGuard, MessageService,],
  bootstrap: [AppComponent],
})
export class AppModule {}
