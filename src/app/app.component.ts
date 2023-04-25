import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';
import { PEValidators } from 'src/app/shared/components/reactive-controls/validators';
import { messages, ErrorMesssagesList } from './shared/components/reactive-controls/global-error-messages';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  
  title = 'PE';

  filter: FormGroup = this.createFormGroup();

  errorMessages: ErrorMesssagesList = messages.formGroupMessages.global;

  createFormGroup(){
    return this.fb.group({
      paymentID: new FormControl("", PEValidators.ManualChecksFilterValidators.PeInputValidators.FormControlValidators.Required),
      applicationID: new FormControl("", PEValidators.ManualChecksFilterValidators.PeInputValidators.FormControlValidators.Required),
      paymentHubPaymentId: new FormControl("", PEValidators.ManualChecksFilterValidators.PeInputValidators.FormControlValidators.Required),
      account: new FormControl("", PEValidators.ManualChecksFilterValidators.PeInputValidators.FormControlValidators.Required),
      dateStart: new FormControl(new Date(), PEValidators.ManualChecksFilterValidators.PeInputValidators.FormControlValidators.Required)
    },{
      validators: PEValidators.ManualChecksFilterValidators.PeInputValidators.FormGroupValidators.Required
    });
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

  ngOnInit(): void {
    
  }

  listenISODate(iso: string | null){
    console.log(iso);
    console.log(this.filter.controls['dateStart'].value);
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
    
  }

}
