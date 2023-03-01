import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './app-loading.component.html',
  styleUrls: ['./app-loading.component.scss']
})
export class AppLoadingComponent implements OnInit {

  constructor(public loadingService: LoadingService){}

  ngOnInit(): void { }

}
