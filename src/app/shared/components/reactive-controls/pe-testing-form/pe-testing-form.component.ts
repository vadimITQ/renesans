import { Component } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { FormGroupManualChecksFilter } from "../reactive-forms-modals";
import { PEGlobalValidators } from "../validations";
import { IMultiSelectData } from "../../controls/pe-multiselect/pe-multiselect.component";
import { IMultiCheckboxData } from "../pe-multi-checkbox-form/pe-r-multi-checkbox/pe-r-multi-checkbox.component";
import { ErrorMesssagesList, messages } from "../global-error-messages";
import { MultiselectDataSets } from "src/app/shared/enums/datasets.enums";

@Component({
    selector: "pe-testing-form",
    templateUrl: "./pe-testing-form.component.html",
    styleUrls: ["./pe-testing-form.component.scss"]
})
export class PeTestingFormComponent {

    constructor(private fb: FormBuilder){}

    checkboxes: IMultiCheckboxData[] = [
      {
        label: "check1",
        value: false
      },
      {
        label: "check2",
        value: true
      },
      {
        label: "check3",
        value: false
      }
    ];
    
    filter: FormGroup = this.createFormGroup();
    
    errorMessages: ErrorMesssagesList = messages.formGroupMessages.global;
    public multiselectDataSetsEnum = MultiselectDataSets;

    get multicheckboxControl(): FormControl {
      return this.filter.controls['multicheckbox'] as FormControl;
    }

    createFormGroup(){
        return this.fb.group<FormGroupManualChecksFilter>({
          paymentID: new FormControl<string | null>("", PEGlobalValidators.ManualChecksFilterValidators.PeInputValidators.FormControlValidators.Required),
          applicationID: new FormControl<string | null>("", PEGlobalValidators.ManualChecksFilterValidators.PeInputValidators.FormControlValidators.Required),
          paymentHubPaymentId: new FormControl<string | null>("", PEGlobalValidators.ManualChecksFilterValidators.PeInputValidators.FormControlValidators.Required),
          account: new FormControl<string | null>("", PEGlobalValidators.ManualChecksFilterValidators.PeInputValidators.FormControlValidators.Required),
          dateStart: new FormControl<Date | null>(new Date(), PEGlobalValidators.ManualChecksFilterValidators.PeInputValidators.FormControlValidators.Required),
          multiselect: new FormControl<IMultiSelectData[] | null>([], PEGlobalValidators.ManualChecksFilterValidators.PeInputValidators.FormControlValidators.PeMultiselect.Required),
          multicheckbox: new FormControl<IMultiCheckboxData[] | null>(this.checkboxes, PEGlobalValidators.ManualChecksFilterValidators.PeInputValidators.FormControlValidators.PeMultiCheckbox.AllTrue)
        },{
          validators: [PEGlobalValidators.ManualChecksFilterValidators.PeInputValidators.FormGroupValidators.Required]
        });
      }

      submit(){
        this.filter.markAsDirty();
        this.filter.markAsTouched();
        this.filter.controls["paymentID"].markAsDirty();
        this.filter.controls["applicationID"].markAsDirty();
        this.filter.controls["paymentHubPaymentId"].markAsDirty();
        this.filter.controls["account"].markAsDirty();
        this.filter.controls["paymentID"].markAsTouched();
        this.filter.controls["applicationID"].markAsTouched();
        this.filter.controls["paymentHubPaymentId"].markAsTouched();
        this.filter.controls["account"].markAsTouched();
        this.filter.controls["dateStart"].markAsDirty();
        this.filter.controls["dateStart"].markAsTouched();
        this.filter.controls["multiselect"].markAsDirty();
        this.filter.controls["multiselect"].markAsTouched();
      }
      
      listenISODate(iso: string | null){ }

}