
import { Component, Input } from "@angular/core";

@Component({
    selector: "pe-indent",
    template: `
        <div [ngClass]="indents"></div>
    `,
    styles: [
        `
            :host {
                display: block;
            }
        `
    ]
})
export class PeIndentComponent {

    @Input() mTop: number = 0;
    @Input() mRight: number = 0;
    @Input() mBottom: number = 0;
    @Input() mLeft: number = 0;

    @Input() pTop: number = 0;
    @Input() pRight: number = 0;
    @Input() pBottom: number = 0;
    @Input() pLeft: number = 0;

    public get indents() {
        return {
            [this.marginTop] : true,
            [this.marginBottom]: true,
            [this.marginLeft]: true,
            [this.marginRight]: true,
            [this.paddingTop]: true,
            [this.paddingBottom]: true,
            [this.paddingLeft]: true,
            [this.paddingRight]: true
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