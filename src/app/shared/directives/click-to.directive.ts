import { Directive, HostListener, Input } from '@angular/core';

@Directive({
    selector: '[clickTo]'
})
export class ClickToDirective {

    @Input() clickTo!: any;

    constructor(){ }

    @HostListener("click") onClick(){
        if (!!this.clickTo?.nativeElement?.click){
            this.clickTo.nativeElement.click();
        }
    }
    
}