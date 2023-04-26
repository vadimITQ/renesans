import { ElementRef } from "@angular/core";
import { MultiSelect } from "primeng/multiselect";

export class PeRMultiselectHelper {
    static fixMultiselectOverflowingProgrammatically(labelRef: ElementRef<any>, multiselectRef: MultiSelect){
        setTimeout(() => { 
            const label = labelRef?.nativeElement as HTMLLabelElement;
            if (!label){
                return;
            }
            const multiselectContainer = multiselectRef.containerViewChild.nativeElement as HTMLElement;
            const labelWidth = label.offsetWidth;
            multiselectContainer.style.maxWidth = `calc(100% - ${ labelWidth }px)`;
        });
    }
}