import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth/auth.service';
import { LoadingService } from './shared/services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  
  title = 'PE';

  constructor(private authService: AuthService){
    // authService.login();
  }

}
