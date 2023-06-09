import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'pe-header',
  templateUrl: './pe-header.component.html',
  styleUrls: ['./pe-header.component.scss'],
})
export class PeHeaderComponent {
  constructor(private authService: AuthService) {}

  get userName() {
    return this.authService.user?.connectionName ?? '';
  }

  logout() {
    this.authService.logout();
  }
}
