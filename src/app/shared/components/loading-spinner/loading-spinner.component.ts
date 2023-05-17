import { Component, Input } from '@angular/core';

@Component({
  selector: 'pe-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss']
})
export class LoadingSpinnerComponent {
  
  @Input() contentHeight: string | "auto" = "auto";
  @Input() marginTop: string = "0px";

}
