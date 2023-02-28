import { Component, OnInit } from '@angular/core';
import { ManualChecksService } from 'src/app/core/services/manual-checks/manual-checks.service';
import { GetPaymentsResponse } from 'src/app/shared/models/manual-checks-models';

@Component({
  selector: 'app-manual-checks-result',
  templateUrl: './manual-checks-result.component.html',
  styleUrls: ['./manual-checks-result.component.scss']
})
export class ManualChecksResultComponent implements OnInit {

  public paymentResponse: GetPaymentsResponse[] | null | undefined = undefined;

  constructor(private mcService: ManualChecksService){ }

  ngOnInit(): void {
    this.mcService.$paymentResponseState.subscribe(paymentData => {
      console.log(this.paymentResponse);
      this.paymentResponse = paymentData;
    })
  }

}
