import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OrdersStat } from 'src/app/shared/enums/orders-Stat.enums';
import { StandingOrderStatResponse } from '../monitoring-standing-orders.types';

@Component({
  selector: 'app-number-of-orders-table',
  templateUrl: './number-of-orders-table.component.html',
  styleUrls: ['./number-of-orders-table.component.scss']
})
export class NumberOfOrdersTableComponent implements OnInit {

  constructor(){ }

  public readonly ordersStat = OrdersStat;

  @Input() standingOrderStatData!: StandingOrderStatResponse | null;
  @Output() OnFilteringByOrdersStat: EventEmitter<OrdersStat> = new EventEmitter();

  ngOnInit(): void { }

  ordersStatRowClicked(ordersStat: OrdersStat) {
    this.OnFilteringByOrdersStat.emit(ordersStat);
  }
  
}
