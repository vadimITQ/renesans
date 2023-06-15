
import { Injectable } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { IAmlDetailsForm } from "./aml-details.types";

@Injectable({
    providedIn: "root"
})
export class AmlDetailsUtils {
    
    constructor(private fb: FormBuilder){}

    createForm(): FormGroup<IAmlDetailsForm>{

        return this.fb.group<IAmlDetailsForm>(
            {
                IdPE: new FormControl(null),
                datePE: new FormControl(null),
                fioPayer: new FormControl(null),
                writeOffAccount: new FormControl(null),
                recipientFio: new FormControl(null),
                recipientAccount: new FormControl(null),
                recipientINN: new FormControl(null),
                recipientBankBIK: new FormControl(null),
                appointment: new FormControl(null),
                transferAmount: new FormControl(null),
                commentary: new FormControl(null),
            }
        )

    }

}