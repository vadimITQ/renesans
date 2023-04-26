import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';
import { PEValidators } from 'src/app/shared/components/reactive-controls/validators';
import { messages, ErrorMesssagesList } from './shared/components/reactive-controls/global-error-messages';
import { MultiselectDataSets } from './shared/enums/datasets.enums';
import { IMultiCheckboxData } from './shared/components/reactive-controls/pe-multi-checkbox-form/pe-r-multi-checkbox/pe-r-multi-checkbox.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  
  title = 'PE';

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

  createFormGroup(){
    return this.fb.group({
      paymentID: new FormControl("", PEValidators.ManualChecksFilterValidators.PeInputValidators.FormControlValidators.Required),
      applicationID: new FormControl("", PEValidators.ManualChecksFilterValidators.PeInputValidators.FormControlValidators.Required),
      paymentHubPaymentId: new FormControl("", PEValidators.ManualChecksFilterValidators.PeInputValidators.FormControlValidators.Required),
      account: new FormControl("", PEValidators.ManualChecksFilterValidators.PeInputValidators.FormControlValidators.Required),
      dateStart: new FormControl(new Date(), PEValidators.ManualChecksFilterValidators.PeInputValidators.FormControlValidators.Required),
      multiselect: new FormControl([], PEValidators.ManualChecksFilterValidators.PeInputValidators.FormControlValidators.PeMultiselect.Required),
      multicheckbox: new FormControl(this.checkboxes, PEValidators.ManualChecksFilterValidators.PeInputValidators.FormControlValidators.PeMultiCheckbox.AllTrue)
    },{
      validators: PEValidators.ManualChecksFilterValidators.PeInputValidators.FormGroupValidators.Required
    });
  }
  
  get multicheckboxControl(): FormControl {
    return this.filter.controls['multicheckbox'] as FormControl;
  }

  constructor(private translateService: TranslateService, private config: PrimeNGConfig, private fb: FormBuilder){
    this.translateService.setDefaultLang("ru");
    this.translateService.use("ru");
    this.translateService
      .get('primeng')
      .subscribe(
        res => {
          this.config.setTranslation(res);
        }
      );
  }

  ngOnInit(): void { }

  listenISODate(iso: string | null){ }

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

}
