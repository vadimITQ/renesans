import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PeNavigationService } from 'src/app/core/services/pe-navigation/pe-navigation.service';

const DEFAULT_ICON_STYLE = {
  'font-size': '1.2rem',
  color: 'rgb(3, 122, 255)',
};

const DEFAULT_LABEL_STYLE = {
  color: 'rgb(3, 122, 255)',
};

@Component({
  selector: 'pe-back-arrow',
  templateUrl: './back-arrow.component.html',
  styleUrls: ['./back-arrow.component.scss'],
})
export class PeBackArrowComponent {
  constructor(private peNavigation: PeNavigationService) {}

  @Input() label: string = 'Назад';
  @Input() labelStyle: { [styleKey: string]: string } = DEFAULT_LABEL_STYLE;
  @Input() iconStyle: { [styleKey: string]: string } = DEFAULT_ICON_STYLE;
  @Input() animate: boolean = true;
  @Output() listenBack: EventEmitter<void> = new EventEmitter<void>();

  public goBack() {
    this.peNavigation.goBack();
    this.listenBack.emit();
  }
}
