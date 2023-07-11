import { DatePipe } from '@angular/common';
import { ISearchPayment } from '../../../../services/search-payment/types';
import { ISearchPaymentTableData } from '../search-payment.types';
import { manualChecksTransferTypes } from '../../../../../shared/variables/manual-checks-transfer-types';
import { DatePickerHelper } from '../../../../../shared/components/controls/date-picker/date-picker-helper';
import { paymentStatusObj } from '../../../../../shared/variables/payment-status';

export function prepareSearchPaymentsData(data: ISearchPayment[], datePipeRef?: DatePipe): ISearchPaymentTableData[] {
  return data.map(searchPayment => {
    const debitPayDoc = !!searchPayment.payDocs ? searchPayment.payDocs.filter(payDoc => payDoc?.dc=== 'Debit')[0] : null;
    const creditPayDoc = !!searchPayment.payDocs ? searchPayment.payDocs.filter(payDoc => payDoc?.dc=== 'Credit')[0]: null;
    const GLDocPayDoc = !!searchPayment.payDocs ? searchPayment.payDocs.filter(payDoc => payDoc?.dc === 'GLDoc')[0] : null;
    const plannedDate = datePipeRef
      ? datePipeRef.transform(DatePickerHelper.parseFromLocaleStringToDate(searchPayment.plannedDate), 'dd-MM-yyyy') ?? ''
      : searchPayment.plannedDate;
    const pmtCreationTime = datePipeRef
      ? datePipeRef.transform(DatePickerHelper.parseFromLocaleStringToDate(searchPayment.pmtCreationTime), 'dd-MM-yyyy HH:mm:ss') ?? ''
      : DatePickerHelper.parseFromLocaleStringToDate(searchPayment.pmtCreationTime)?.toISOString() ?? '';

    return {
      paymentID: searchPayment.paymentID,
      pmtCreationTime,
      plannedDate,
      statusCodePE: searchPayment.statusCodePE,
      statusDescriptionPE: paymentStatusObj[searchPayment.statusCodePE],
      type: manualChecksTransferTypes.find(({ value }) => value === searchPayment.paymentApplication.type)?.label ?? '',
      amount: searchPayment.paymentApplication.amount,
      fee: searchPayment.paymentApplication.fee,
      sourceSystem: searchPayment.sourceSystem,
      docNum_D: debitPayDoc?.docNum ?? '',
      docStatus_D: debitPayDoc?.docStatus ?? '',
      docID_D: debitPayDoc?.accntDeb || GLDocPayDoc?.accntDeb || '',
      targetSystem: searchPayment.targetSystem,
      docNum_C: creditPayDoc?.docNum ?? '',
      docStatus_C: creditPayDoc?.docStatus ?? '',
      docID_C: creditPayDoc?.accntCre || GLDocPayDoc?.accntCre || debitPayDoc?.accntCre || '',
      cifID: searchPayment.paymentApplication.payer.user?.cifID ?? '',
      applicationID: searchPayment.paymentApplication.applicationID,
      referenceSbpTransactionId: searchPayment.paymentApplication.sbp?.referenceSbpTransactionId ?? '',
      sbpWorkflowType: searchPayment.paymentApplication.sbp?.sbpWorkflowType ?? '',
      idPH: searchPayment.paymentApplication.ipt?.idPH ?? '',
    };
  });
}
