import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { RouterPath } from '../../../shared/enums/router.enums';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {

  title = '';

  constructor(private router: Router) {
    const state = this.router?.getCurrentNavigation()?.extras?.state;
    console.log(state);
    if (state){
      this.title = state["name"] ?? "";
    }
  }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd){
        const state = this.router?.getCurrentNavigation()?.extras?.state;
        console.log(state);
        if (state){
          this.title = state["name"] ?? "";
        }
      }
    })
  }

  goToPayment() {
    this.router.navigate([RouterPath.PaymentEngine]);
  }
}
