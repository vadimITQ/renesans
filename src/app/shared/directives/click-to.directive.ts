import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
    selector: '[clickTo]'
})
export class ClickToDirective {

    @Input() clickTo: ElementRef | null = null;

    constructor(){
        if (this.clickTo){
            this.clickTo.nativeElement?.click();
        }
    }
    
}