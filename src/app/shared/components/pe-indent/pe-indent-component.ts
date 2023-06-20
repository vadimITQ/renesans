import { Component, Input } from '@angular/core';

@Component({
  selector: 'pe-indent',
  template: ` <div [ngClass]="indents"></div> `,
  styles: [
    `
      div {
        height: 0.1px;
      }
      :host:has(.inline) {
        display: inline-block;
      }
    `,
  ],
})
export class PeIndentComponent {
  @Input() mTop: number | 'auto' = 0;
  @Input() mRight: number | 'auto' = 0;
  @Input() mBottom: number | 'auto' = 0;
  @Input() mLeft: number | 'auto' = 0;

  @Input() pTop: number | 'auto' = 0;
  @Input() pRight: number | 'auto' = 0;
  @Input() pBottom: number | 'auto' = 0;
  @Input() pLeft: number | 'auto' = 0;

  @Input() inline: boolean = false;

  public get indents() {
    return {
      [this.marginTop]: true,
      [this.marginBottom]: true,
      [this.marginLeft]: true,
      [this.marginRight]: true,
      [this.paddingTop]: true,
      [this.paddingBottom]: true,
      [this.paddingLeft]: true,
      [this.paddingRight]: true,
      ['inline']: this.inline,
    };
  }

  private get marginTop(): string {
    return `mt-${this.mTop}`;
  }

  private get marginBottom(): string {
    return `mb-${this.mBottom}`;
  }

  private get marginLeft(): string {
    return `ml-${this.mLeft}`;
  }

  private get marginRight(): string {
    return `mr-${this.mRight}`;
  }

  private get paddingTop(): string {
    return `pt-${this.pTop}`;
  }

  private get paddingBottom(): string {
    return `pb-${this.pBottom}`;
  }

  private get paddingLeft(): string {
    return `pl-${this.pLeft}`;
  }

  private get paddingRight(): string {
    return `pr-${this.pRight}`;
  }
}
