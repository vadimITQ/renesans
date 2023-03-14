import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { PeNavigationService } from '../../services/pe-navigation/pe-navigation.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {

  title = '';

  constructor(private router: Router, private peNavigationService: PeNavigationService ) {
    const state = this.router?.getCurrentNavigation()?.extras?.state;
    if (state){
      this.title = state["name"] ?? "";
    }
  }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd){
        const state = this.router?.getCurrentNavigation()?.extras?.state;
        if (state){
          this.title = state["name"] ?? "";
        }
      }
    })
  }

  goToPayment() {
    this.peNavigationService.goToHome();
  }
}
