import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { manualChecksTransferTypes } from '../../../../../shared/variables/manual-checks-transfer-types';

@Component({
  selector: 'app-manual-checks-filter',
  templateUrl: './manual-checks-filter.component.html',
  styleUrls: ['./manual-checks-filter.component.scss']
})
export class ManualChecksFilterComponent {

  constructor(private fb: FormBuilder) { }

  public dateFrom: Date = new Date();
  public dateTo: Date = new Date();
  public transferTypes = manualChecksTransferTypes;

  public msFilterFormGroup: FormGroup = this.fb.group({
    ID_PE: new FormControl(""),
    ID_PT: new FormControl(""),
    ID_PH: new FormControl(""),
    ID_NC: new FormControl(""),
    dateFrom: new FormControl(new Date()),
    timeFrom: new FormControl(new Date()),
    dateTo: new FormControl(new Date()),
    timeTo: new FormControl(new Date()),
    status: new FormControl(""),
    transferType: new FormControl(""),
  });

  openDateFromCalendar() {
    
  }
  
  openDateToCalendar() {

  }

}
