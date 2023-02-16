import { Component } from '@angular/core';
import { AuthService } from '../../../shared/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  errorMessage: string = "";

  constructor(private authService: AuthService) {}

  login() {
    this.authService.login();
  }
  
}
