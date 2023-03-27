import { Directive, HostListener, Input } from '@angular/core';

@Directive({
    selector: '[allowedInputCharactersReg]'
})
export class AllowedInputCharactersDirective {

    constructor(){ }

    @Input() allowedInputCharactersReg!: RegExp;

    @HostListener("keydown", ['$event']) onKeyDown(event: KeyboardEvent){
        if (this.allowedInputCharactersReg){
            const validCharacter = this.allowedInputCharactersReg.test(event.key);
            const backspace = event.key == "Backspace"
            if (!validCharacter && !backspace){
                event.preventDefault();
            }
        }
    }
    
}