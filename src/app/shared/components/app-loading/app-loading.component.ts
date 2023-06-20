import { Component } from '@angular/core';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './app-loading.component.html',
  styleUrls: ['./app-loading.component.scss'],
})
export class AppLoadingComponent {
  constructor(public loadingService: LoadingService) {}
}
