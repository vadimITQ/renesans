import { Component } from '@angular/core';
import { AuthService } from './core/services/auth/auth.service';
import { LoadingService } from './shared/services/loading.service';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  
  title = 'PE';

  constructor(private translateService: TranslateService, private config: PrimeNGConfig){
    this.translateService.setDefaultLang("ru");
    this.translateService.use("ru");
    this.translateService
      .get('primeng')
      .subscribe(
        res => {
          console.log(res);
          this.config.setTranslation(res);
        }
      );
  }

}
