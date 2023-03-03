import { Directive, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
    selector: '[allowedInputCharactersReg]'
})
export class AllowedInputCharactersDirective {

    @Input() allowedInputCharactersReg!: RegExp;

    constructor(private ngControl: NgControl){ }

    @HostListener("keyup", ['$event']) onInput(event: KeyboardEvent){
        if (this.allowedInputCharactersReg){
            const input = event.target as HTMLInputElement;
            const value = input.value;
            const valid = this.allowedInputCharactersReg.test(value);
            const backspace = event.key == "Backspace"
            if (value && !valid && !backspace){
                this.ngControl.control?.setValue(input.value.slice(0, -1));
            }
        }
    }
    
}