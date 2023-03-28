import { Directive, ElementRef, HostListener, Input, OnDestroy } from '@angular/core';
import { NgControl } from '@angular/forms';
import { debounce, fromEvent, map, merge, Subscription, timer } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Directive({
    selector: '[allowedInputCharactersReg]'
})
export class AllowedInputCharactersDirective implements OnDestroy {

    @Input() allowedInputCharactersReg!: RegExp;

    private bindKeypressEventSubscribtion!: Subscription;

    constructor(private ngControl: NgControl, private el: ElementRef) { 
        this.listenCtrlV();
    }

    ngOnDestroy(): void {
        if (this.bindKeypressEventSubscribtion){
            this.bindKeypressEventSubscribtion.unsubscribe();
            console.log("unsubscribed", this.el);
        }
    }

    @HostListener("keydown", ['$event']) onKeyDown(event: KeyboardEvent) {
        if (this.allowedInputCharactersReg) {
            const validCharacter = this.allowedInputCharactersReg.test(event.key);
            const backspace = event.key == "Backspace"
            if (!validCharacter && !backspace) {
                event.preventDefault();
            }
        }
    }

    private listenCtrlV(){
        this.bindKeypressEventSubscribtion = this.bindKeypressEvent().subscribe(($event: KeyboardEvent) => this.onCtrvPressed($event));
    }

    private onCtrvPressed($event: KeyboardEvent) {
        const valid = this.allowedInputCharactersReg.test(this.ngControl.value);
        if (!valid && !!this.ngControl.value) {
            let result = "";
            (this.ngControl.value as string).split("").forEach(char => {
                const validCharacter = this.allowedInputCharactersReg.test(char);
                if (validCharacter) {
                    result += char;
                }
            });
            this.ngControl.control?.setValue(result);
        }
    }

    private bindKeypressEvent(): Observable<KeyboardEvent> {
        const eventsType$ = [
            fromEvent(window, 'keypress'),
            fromEvent(window, 'keyup')
        ];
        return merge(...eventsType$)
            .pipe(
                debounce(() => timer(10)),
                map(state => (state as KeyboardEvent))
            );
    }
}
