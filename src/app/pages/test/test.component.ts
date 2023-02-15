import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterPath } from '../../shared/enums/router.enums';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent {
  title = 'renesans';

  constructor(private router: Router) {
    console.log('123');
  }

  goHome() {
    this.router.navigate([RouterPath.Home]);
  }
}
